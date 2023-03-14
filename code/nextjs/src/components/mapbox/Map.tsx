import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

const Map = () => {

  // setting up const's
  const mapContainer = useRef<any>(null)
  const map  = useRef<mapboxgl.Map | any>(null)

  // on load
  useEffect(() => {
    // set access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '' 

    // init map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
      center: [103.808052586332, 1.3516161224392],
      zoom: 11
    })

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    )





    // destroy element
    return () => {
    
    }
  }, [])
  



  return(
    <div className='mapElement w-full h-full' ref={mapContainer} />
  )
}



export default Map