import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addNoti, createNoti} from "@/components/slice/notification";
import {RootState} from "@/store";
import {coordinatesFromGeoCoords, update} from "@/components/slice/location";


const Geolocation = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.watchPosition(pos=>{
        dispatch(update(coordinatesFromGeoCoords(pos.coords)))
      })
    }
  },[]) // eslint-disable-line


  return(
    <></>
  )
}

export default Geolocation