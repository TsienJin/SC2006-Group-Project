import { sideBarStatesEnum } from "@/components/slice/sideBar"
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import ExampleScreen from "./screens/Example"
import SideBarTop from "./SideBarTop"




const SideBar = () => {

  const sideBarState = useSelector((state:RootState) => state.sideBar.state)

  const showSideBar = ():boolean => {
    if(sideBarState == sideBarStatesEnum.None){
      return false
    }
    return true
  }


  return(
    <div className={`transition-all ${showSideBar()?"":"-ml-[100%]"} absolute top-0 left-0 md:bottom-10 max-w-[100vw] w-full md:w-[35vw] md:rounded-br-lg md:overflow-scroll shadow-lg z-20 bg-white`}>
      <SideBarTop />
      <ExampleScreen />
      <div className="h-[200vh]">
        {sideBarState}
      </div>
    </div>
  )
}

export default SideBar