import {popLatest, sideBarStatesEnum} from "@/components/slice/sideBar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {useState} from "react";
import {setEnd, setStart} from "@/components/slice/route";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";
import Find, {FindCallback} from "@/components/mapbox/Find";
import {Coordinates, emptyCoords} from "@/components/slice/location";


const RouteEditScreen = ({point}:{point:sideBarStatesEnum}) => {

  // TODO handle the click location portion to update state from dropdown
  // TODO duplicate for end route

  const location = useSelector((state:RootState) => state.route)
  const [placeVal, setPlaceVal] = useState<Coordinates>(emptyCoords)

  const dispatch = useDispatch()


  const getLabel = ():string => {
    switch (point){
      case sideBarStatesEnum.RouteStart: return "Start location";
      case sideBarStatesEnum.RouteEnd: return "End location";
      default: return "Set location"
    }
  }


  const getDefault = ():string|undefined => {
    switch(point){
      case sideBarStatesEnum.RouteStart: return location?.start?.address || "";
      case sideBarStatesEnum.RouteEnd: return location?.end?.address || "";
      default: return ""
    }
  }


  const callback:FindCallback = (place) => {
    switch(point){
      case sideBarStatesEnum.RouteStart: {
        dispatch(setStart(place))
        break
      }
      case sideBarStatesEnum.RouteEnd: {
        dispatch(setEnd(place))
        break
      }
      default: {
        dispatch(addNoti(createNoti(
          "Internal error",
          "An internal error occurred in RouteEdit.tsx",
          notiType.Warning
        )))
      }
    }

    dispatch(popLatest(point))
  }


  return(
    <Find label={getLabel()} callback={callback} defaultVal={getDefault()}/>
  )
}



export default RouteEditScreen