import mapboxgl from 'mapbox-gl'

import HeadComponent from '@/components/seo/HeadComponent'


export default function Home() {
  return (
    <>
      <HeadComponent title='NaviLoo | Navigate the Loo'/>
      <div className='text-blue-600'>
        <div className="mapHere w-10 h-10">

        </div>
      </div>
    </>
  )
}
