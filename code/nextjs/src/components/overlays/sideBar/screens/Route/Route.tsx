import Tab from "@/components/clickeable/Tab";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {Action} from "@/components/clickeable/types";
import {addToStack, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useEffect, useState} from "react";
import Button, {buttonColourBlue, buttonColourBlueOutline, buttonColourRust} from "@/components/clickeable/Button";
import {Route, setEnd, setRoute, setStart} from "@/components/slice/route";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";
import {v4} from "uuid";
import FieldWrapper from "@/components/fields/FieldWrapper";
import FieldContainer from "@/components/fields/FieldContainer";
import {emptyCoords} from "@/components/slice/location";


function getExcludeString(route:Route):any {

  let str = ""

  if(route.options.avoidMotor){
    str.concat("motorway,")
  }

  if(route.options.avoidTolls){
    str.concat("toll,")
  }

  if(str.length>0){
    return {
      exclude: str.slice(0, -1)
    }
  }

  return {}
}



async function getRoute({route, callback=()=>{}}:{route:Route, callback?:any}):Promise<any> {


  try {
    const excludeStr = getExcludeString(route)

    const res = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${route.start.longitude},${route.start.latitude};${route.end.longitude},${route.end.latitude}`,
      {
        params: {
          access_token: process.env.NEXT_PUBLIC_MAPBOX_KEY,
          geometries: "geojson",
          steps: true,
          banner_instructions: true,
          ...getExcludeString(route)
        }
      }
    )

    return res.data
  } catch (e) {
    throw new Error("oops, something bad happened when getting route")
  }

}



const Directions = ({routeState}:{routeState:Route}) => {

  return(
    <div className={"bg-gray-100 shadow mx-3 mb-3 rounded divide-y divide-white overflow-hidden"}>
      {
        routeState.route?.routes[0]?.legs[0]?.steps.map((item:any)=>{
          return(
            <div key={v4()} className={"transition p-3 md:hover:bg-gray-200"}>
              <p className={"font-normal text-shadow"}>{item?.maneuver?.instruction}</p>
              <p className={"font-light text-sm opacity-60"}>
                <span>{item?.distance} meters</span>
                {item?.name.length>0 && <span> along {item?.name}</span>}
                <span>.</span>

              </p>
            </div>
          )
        })
      }
    </div>
  )
}





const RouteScreen = () => {

  const routeState = useSelector((state:RootState)=>state.route)
  const dispatch = useDispatch()

  const [startPlaceHolder, setStartPlaceholder] = useState<string>("")
  const [startEndHolder, setEndPlaceholder] = useState<string>("")

  const [routeButtonText, setRouteButtonText] = useState<string>("Begin Route")

  const isValid = routeState.end.found&&routeState.start.found

  const gotoStart:Action = () =>{
    dispatch(addToStack(sideBarStatesEnum.RouteStart))
  }

  const gotoEnd:Action = () =>{
    dispatch(addToStack(sideBarStatesEnum.RouteEnd))
  }

  useEffect(()=>{
    if(routeState.start?.name){
      setStartPlaceholder(routeState.start.name)
    } else {
      setStartPlaceholder("Choose a location")
    }

    if(routeState.end?.name){
      setEndPlaceholder(routeState.end.name)
    } else {
      setEndPlaceholder("Choose a location")
    }


  }, [routeState])


  const optionsPage:Action = () => {
    dispatch(addToStack(sideBarStatesEnum.RouteOptions))
  }

  useEffect(()=>{
    if(routeState.route != undefined && isValid){
      setRouteButtonText("Refresh Route")
    } else {
      setRouteButtonText("Begin Route")
    }
  }, [routeState.route, isValid])

  const endRouteButton:Action = () => {
    dispatch(setRoute(undefined))
    dispatch(setStart(emptyCoords))
    dispatch(setEnd(emptyCoords))
  }

  const routeButtonAction:Action = () => {
    if(isValid){
      try {
        getRoute({
          route: routeState
        }).then(r => {
          dispatch(setRoute(r))
        })
      } catch (e) {
        console.error(e)
        dispatch(addNoti(createNoti(
          "Error getting route!",
          "Something bad happened, try again later.",
          notiType.Warning
        )))
      }
    }
  }



  return(
    <div className={""}>
      <div>
        <Tab itemName={"Start"} placeholder={startPlaceHolder} action={gotoStart} />
        <Tab itemName={"Destination"} placeholder={startEndHolder} action={gotoEnd} />
        <Tab itemName={"Options"} placeholder={"Edit"} action={optionsPage}/>
      </div>
      <div className={`transition relative flex flex-row justify-center items-center w-full p-3 ${isValid?"gap-x-2":"opacity-50 cursor-not-allowed"}`}>
        <Button text={routeButtonText} colour={routeState?.route?buttonColourBlueOutline:buttonColourRust} action={routeButtonAction} padding={false}/>
        {routeState?.route && isValid &&
          <Button text={"End Route"} colour={buttonColourRust} padding={false} action={endRouteButton}/>
        }
      </div>
      {routeState?.route?.routes && isValid && <Directions routeState={routeState}/>}
    </div>
  )
}


export default RouteScreen