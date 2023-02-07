import { sideBarStatesEnum } from "@/components/slice/sideBar"
import { RootState } from "@/store"
import { useSelector } from "react-redux"
import ExampleScreen from "./screens/Example"
import SideBarTop from "./SideBarTop"
import AccountScreen from "@/components/overlays/sideBar/screens/Account";
import {useEffect, useState} from "react";


const SideBarScreen = () => {

  const sideBarState = useSelector((state:RootState) => state.sideBar.stack)
  const [topState, setTopState] = useState<sideBarStatesEnum>()

  useEffect(()=>{
    if(sideBarState.length>0){
      setTopState(sideBarState[sideBarState.length-1])
    }
  }, [sideBarState])

  switch (topState){
    case sideBarStatesEnum.Account: return <AccountScreen />
    default: return <ExampleScreen />
  }

}







const SideBar = () => {

  const sideBarState = useSelector((state:RootState) => state.sideBar.state)

  const showSideBar = ():boolean => {
    if(sideBarState == sideBarStatesEnum.None){
      return false
    }
    return true
  }


  return(
    <div className={`transition-all ${showSideBar()?"opacity-100":"opacity-0 -ml-[100%]"} absolute top-0 left-0 md:bottom-10 max-w-[100vw] w-full md:w-[35vw] md:rounded-br-lg md:overflow-scroll shadow-lg z-20 bg-white`}>
      <SideBarTop />
      <SideBarScreen />
      <div className="h-[200vh]">
        {sideBarState}
      </div>
    </div>
  )
}

export default SideBar