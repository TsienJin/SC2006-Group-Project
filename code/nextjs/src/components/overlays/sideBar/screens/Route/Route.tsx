import Tab from "@/components/clickeable/Tab";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {Action} from "@/components/clickeable/types";
import {addToStack, sideBarStatesEnum} from "@/components/slice/sideBar";


const RouteScreen = () => {

  const routeState = useSelector((state:RootState)=>state.route)
  const dispatch = useDispatch()

  const gotoStart:Action = () =>{
    dispatch(addToStack(sideBarStatesEnum.RouteStart))
  }

  const gotoEnd:Action = () =>{
    dispatch(addToStack(sideBarStatesEnum.RouteEnd))
  }


  return(
    <div>
      <Tab itemName={"Start"} placeholder={routeState.start} action={gotoStart} />
      <Tab itemName={"Destination"} placeholder={routeState.end} action={gotoEnd} />
    </div>
  )
}


export default RouteScreen