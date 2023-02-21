import HeadComponent from '@/components/seo/HeadComponent'
import Map from '@/components/mapbox/Map'
import Menu from '@/components/overlays/menu/Menu'
import SideBar from '@/components/overlays/sideBar/SideBar'

export default function Home() {
  return (
    <>
      <HeadComponent title={'NaviLoo | Find Toilet Locations on the Go'} description={'Find your way from point A to B with ease using our navigation tool. Plus, never worry about finding a toilet with our toilet locator feature.'} />
      <div className='w-[100dvw] h-[100dvh] relative'>
        <SideBar />
        <Menu />
        <Map />
      </div>
    </>
  )
}