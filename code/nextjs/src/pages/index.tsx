import HeadComponent from '@/components/seo/HeadComponent'
import Map from '@/components/mapbox/Map'
import Overlay from '@/components/overlays/Overlay'
import Menu from '@/components/overlays/menu/Menu'

export default function Home() {
  return (
    <>
      <HeadComponent title={'NaviLoo | Find Toilet Locations on the Go'} description={'Find your way from point A to B with ease using our navigation tool. Plus, never worry about finding a toilet with our toilet locator feature.'} />
      <div className='w-screen h-screen relative'>
        <Menu />
        <Map />
      </div>
    </>
  )
}
