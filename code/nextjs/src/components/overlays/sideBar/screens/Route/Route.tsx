import Tab from "@/components/clickeable/Tab";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {Action} from "@/components/clickeable/types";
import {addToStack, setState, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useEffect, useState} from "react";
import Button, {buttonColourRust} from "@/components/clickeable/Button";
import {Coordinates} from "@/components/slice/location";



async function getRoute({start, end, callback=()=>{}}:{start:Coordinates, end:Coordinates, callback?:any}):Promise<any> {


}





const RouteScreen = () => {

  const routeState = useSelector((state:RootState)=>state.route)
  const dispatch = useDispatch()

  const [startPlaceHolder, setStartPlaceholder] = useState<string>("")
  const [startEndHolder, setEndPlaceholder] = useState<string>("")

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

  const routeButtonAction:Action = () => {
    getRoute({
      start: routeState.start,
      end: routeState.end
    }).then(r => {
      console.log(r)
    })
  }


  return(
    <div className={""}>
      <div>
        <Tab itemName={"Start"} placeholder={startPlaceHolder} action={gotoStart} />
        <Tab itemName={"Destination"} placeholder={startEndHolder} action={gotoEnd} />
      </div>
      <div className={`transition relative flex flex-col justify-end ${routeState.end.found&&routeState.start.found?"":"opacity-50 cursor-not-allowed"}`}>
        <Button text={"Begin Route"} colour={buttonColourRust} />
      </div>
    </div>
  )
}


export default RouteScreen