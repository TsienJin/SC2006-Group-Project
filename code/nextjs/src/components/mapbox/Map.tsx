import {Map as Mapbox, GeolocateControl, Marker, Popup, useMap, Source, Layer} from 'react-map-gl'
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import mapboxgl from "mapbox-gl";
import Test from "@/components/mapbox/Markers/test";
import RouteLocationMarker from "@/components/mapbox/Markers/routeLocation";
import {GeoJSON} from "geojson";
import TrafficMarkers from "@/components/mapbox/Markers/Traffic";
import Toilets from "@/components/mapbox/Markers/toilet";








const Map = () => {


  const zoomLoc = useSelector((state:RootState) => state.location.coords)
  const routeState = useSelector((state:RootState) => state.route)
  const sysSetting = useSelector((state:RootState) => state.system)

  const [plotRoute, setPlotRoute] = useState<boolean>(false)
  const [routeGeojson, setRouteGeojson] = useState<GeoJSON>()

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




  useEffect(()=>{

    try {
      if(routeState?.route?.routes[0]?.geometry){
        console.log(routeState?.route?.routes[0])
        setPlotRoute(true)
        setRouteGeojson({
          ...routeState?.route?.routes[0]?.geometry
        })
      } else {
        setPlotRoute(false)
      }
    } catch (e) {
      setPlotRoute(false)
    }
  }, [routeState])

  const layerStyle:any = {
    id: 'route',
    type: 'line',
    paint: {
      'line-color': '#731DD8',
      'line-width': 4,
    }
  }


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
        { plotRoute && routeState?.route?.routes &&
            <Source type={"geojson"} id={"route"} data={{...routeState?.route?.routes[0]?.geometry}}>
              <Layer {...layerStyle} />
            </Source>
        }
        {/*<Test />*/}
        { sysSetting.showToilet && <Toilets /> }
        { sysSetting.showTraffic && <TrafficMarkers /> }
        <RouteLocationMarker />
        <GeolocateControl showAccuracyCircle={true} showUserHeading={true} />
      </Mapbox>
    </>
  )
}



export default Map