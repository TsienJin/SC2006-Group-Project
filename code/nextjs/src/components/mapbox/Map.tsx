import {Map as Mapbox, GeolocateControl, Marker, Popup, useMap} from 'react-map-gl'
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import mapboxgl from "mapbox-gl";





const Test = () => {

  const [open, setOpen] = useState<boolean>(false)

  const toggle = () => {
    setOpen(!open)
  }

  return(
    <>
      <Marker longitude={103.6831} latitude={1.3483} onClick={toggle}>
        <div className={`transition-all rounded-full border-2 border-white w-7 h-7 flex flex-row justify-center items-center ${open?"bg-rust":"bg-violet"}`}>
          <span className={"font-bold text-lg text-white"}>T</span>
        </div>
      </Marker>
      {open &&
          <Popup
              longitude={103.6831}
              latitude={1.3483}
              anchor={"bottom"}
              closeOnClick={false}
              closeOnMove={false}
              closeButton={false}
              offset={12}
          >
              <div>
                  pooop
              </div>
          </Popup>
      }
    </>
  )
}




const Map = () => {


  const zoomLoc = useSelector((state:RootState) => state.location.coords)

  const mapRef = useRef(null)

  useEffect(()=>{

    let found = 11

    if(zoomLoc?.found){
      found = 16
    }

    // @ts-ignore
    mapRef?.current?.flyTo({
      center: [zoomLoc.longitude, zoomLoc.latitude],
      zoom: found,
      speed:0.7
    })
  }, [zoomLoc]) //eslint-disable-line



  return(
    <>
      <Mapbox ref={mapRef}
        initialViewState={{
          longitude: 103.808052586332,
          latitude: 1.3516161224392,
          zoom: 11
      }}

        mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      >
        <GeolocateControl showAccuracyCircle={true} showUserHeading={true} />
        <Test />
      </Mapbox>
    </>
  )
}



export default Map