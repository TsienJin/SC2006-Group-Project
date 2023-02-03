import HeadComponent from '@/components/seo/HeadComponent'
import Map from '@/components/mapbox/Map'
import Overlay from '@/components/overlays/Overlay'
import Menu from '@/components/overlays/menu/Menu'

export default function Home() {
  return (
    <>
      <HeadComponent title='NaviLoo | Navigate the Loo'/>
      <div className='w-screen h-screen relative'>
        <Menu />
        <Map />
      </div>
    </>
  )
}
