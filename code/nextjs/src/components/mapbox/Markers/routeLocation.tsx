import {Coordinates} from "@/components/slice/location";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Marker, Popup} from "react-map-gl";
import {RoutePoint} from "@/components/slice/route";
import {useState} from "react";


const PointMarker = ({location, type}:{location:Coordinates, type:RoutePoint}) => {

  const [open, setOpen] = useState<boolean>(false)

  const toggle = () => {
    setOpen(!open)
  }

  const mark = () => {
    switch(type){
      case RoutePoint.Start: {
        return(
          <div className={"rounded-lg border-2 px-2 py-1 border-violet bg-white text-violet shadow-xl"}>
            <span>Start</span>
          </div>
        )
      }
      case RoutePoint.End: {
        return(
          <div className={"rounded-lg border-2 px-2 py-1 border-rust bg-rust text-white shadow-xl"}>
            <span>Destination</span>
          </div>
        )
      }
      default: return(<>Something is Missing</>)
    }
  }


  return(
    <Marker longitude={location.longitude} latitude={location.latitude} onClick={toggle}>
      {mark()}
      {open &&
        <Popup
            longitude={location.longitude}
            latitude={location.latitude}
            anchor={"bottom"}
            closeOnClick={false}
            closeOnMove={false}
            closeButton={false}
            offset={12}
        >'
            <span className={"capitalize"}>
              {location.name}
            </span>
        </Popup>
      }
    </Marker>
  )
}


const RouteLocationMarker = () => {

  const route = useSelector((state:RootState) => state.route)

  return(
    <>
      { route.end.found && <PointMarker location={route.end} type={RoutePoint.End}/> }
      { route.start.found && <PointMarker location={route.start} type={RoutePoint.Start}/> }
    </>
  )
}

export default RouteLocationMarker