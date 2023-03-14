import Tab from "@/components/clickeable/Tab";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {Action} from "@/components/clickeable/types";
import {addToStack, setState, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useEffect, useState} from "react";


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
    if(routeState.start.length){
      setStartPlaceholder(routeState.start)
    } else {
      setStartPlaceholder("Choose a location")
    }

    if(routeState.end.length){
      setEndPlaceholder(routeState.end)
    } else {
      setEndPlaceholder("Choose a location")
    }


  }, [routeState])


  return(
    <div>
      <Tab itemName={"Start"} placeholder={startPlaceHolder} action={gotoStart} />
      <Tab itemName={"Destination"} placeholder={startEndHolder} action={gotoEnd} />
    </div>
  )
}


export default RouteScreen