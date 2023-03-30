import {Marker, Popup} from "react-map-gl";
import {useEffect, useState} from "react";
import {middlewareOptions} from "@/middleware/types";
import {getMiddleWare} from "@/middleware/middleware";
import {useDispatch} from "react-redux";
import {addNoti, createNoti, notiType} from "@/components/slice/notification";


export type TrafficIncident = {
  trafficType: string,
  message: string,
  coordinates: {
    longitude: number,
    latitude: number,
  }
}




const Mark = ({incident}:{incident:TrafficIncident}) => {


  const [open, setOpen] = useState<boolean>(false)

  const toggle = () => {
    setOpen(!open)
  }

  return(
    <>
      <Marker longitude={incident.coordinates.longitude} latitude={incident.coordinates.latitude} onClick={toggle}>
        <div className={"bg-red-600 rounded-full overflow-hidden text-offwhite"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
      </Marker>
      { open &&
        <Popup
            longitude={incident.coordinates.longitude}
            latitude={incident.coordinates.latitude}
            anchor={"bottom"}
            closeOnClick={false}
            closeOnMove={true}
            closeButton={false}
            offset={12}
        >
            <div className={"flex flex-col justify-start items-start"}>
                <span className={"text-shadow font-medium"}>{incident.trafficType}</span>
                <span>{incident.message}</span>
            </div>
        </Popup>
      }
    </>
  )
}




const TrafficMarkers = () => {

  const dispatch = useDispatch()

  const [traffic, setTraffic] = useState<TrafficIncident[]>([])


  useEffect(()=>{ // loading traffic info
    const options:middlewareOptions = {
      endpoint: `${process.env.NEXT_PUBLIC_BACKEND}/settings/retrievetraffic/`,
    }

    getMiddleWare(options) // calls on load
      .then(r=>{
        console.log(r)
        setTraffic(r?.incidents)
      })
      .catch(e=>{
        dispatch(addNoti(createNoti(
          "Error fetching traffic!",
          "Something went wrong and we weren't able to fetch traffic incidents.",
          notiType.Warning
        )))
      })

  },[]) //eslint-disable-line

  return(
    <>
      {
        traffic.map(item=>{
          return(
            <Mark incident={item} />
          )
        })
      }
    </>
  )
}

export default TrafficMarkers