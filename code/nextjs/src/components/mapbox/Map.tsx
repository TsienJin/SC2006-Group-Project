import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'

const Map = () => {

  // setting up consts
  const mapContainer = useRef<any>(null)
  const map  = useRef<mapboxgl.Map | any>(null)

  // on load
  useEffect(() => {
    // set access token
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY ?? '' 

    // init map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/tsienjin/cldedq01h007c01r0t9ctf0ak',
      center: [103.808052586332, 1.3516161224392],
      zoom: 11
    })
  

    // destroy element
    return () => {
    
    }
  }, [])
  



  return(
    <div className='mapElement w-full h-full' ref={mapContainer} />
  )
}



export default Map