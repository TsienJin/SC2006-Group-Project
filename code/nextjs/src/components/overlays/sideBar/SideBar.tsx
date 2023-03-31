import {sideBarStatesEnum} from "@/components/slice/sideBar"
import {RootState} from "@/store"
import {useSelector} from "react-redux"
import ExampleScreen from "./screens/Example"
import SideBarTop from "./SideBarTop"
import AccountLoginScreen from "@/components/overlays/sideBar/screens/Account/AccountLogin";
import {useEffect, useState} from "react";
import AccountCreateScreen from "@/components/overlays/sideBar/screens/Account/AccountCreate";
import AccountForgetPassword from "@/components/overlays/sideBar/screens/Account/AccountForgetPassword";
import AccountScreen from "@/components/overlays/sideBar/screens/Account/Account";
import {User} from "@/components/slice/user";
import AccountEditName from "@/components/overlays/sideBar/screens/Account/AccountEditName";
import AccountEditEmail from "@/components/overlays/sideBar/screens/Account/AccountEditEmail";
import AccountEditPassword from "@/components/overlays/sideBar/screens/Account/AccountEditPassword";
import SettingScreen from "@/components/overlays/sideBar/screens/Settings/Settings";
import RouteScreen from "@/components/overlays/sideBar/screens/Route/Route";
import RouteEditScreen from "@/components/overlays/sideBar/screens/Route/RouteEdit";
import AddToilet from "@/components/overlays/sideBar/screens/AddToilet/AddToilet";
import FindScreen from "@/components/overlays/sideBar/screens/Find/FindScreen";
import RouteOptions from "@/components/overlays/sideBar/screens/Route/RouteOptions";
import ReviewScreen from "@/components/overlays/sideBar/screens/Review/review";


const SideBarScreen = () => {

  const userState:User = useSelector((state:RootState) => state.user)
  const sideBarState = useSelector((state:RootState) => state.sideBar.stack)
  const [topState, setTopState] = useState<sideBarStatesEnum>()

  useEffect(()=>{
    if(sideBarState.length>0){
      setTopState(sideBarState[sideBarState.length-1])
    }
  }, [sideBarState])

  switch (topState){
    case sideBarStatesEnum.Account: {
      if (userState.id){
        return <AccountScreen />
      }
      return <AccountLoginScreen />
    }

    case sideBarStatesEnum.Test: return <AccountLoginScreen />

    case sideBarStatesEnum.AccountCreate: return <AccountCreateScreen />
    case sideBarStatesEnum.AccountForget: return <AccountForgetPassword />

    case sideBarStatesEnum.AccountEditPassword: return <AccountEditPassword />
    case sideBarStatesEnum.AccountEditEmail: return <AccountEditEmail />
    case sideBarStatesEnum.AccountEditName: return <AccountEditName />

    case sideBarStatesEnum.Settings: return <SettingScreen />

    case sideBarStatesEnum.Route: return <RouteScreen />

    case sideBarStatesEnum.RouteOptions: return <RouteOptions />

    case sideBarStatesEnum.RouteStart: return <RouteEditScreen point={sideBarStatesEnum.RouteStart}/>
    case sideBarStatesEnum.RouteEnd: return <RouteEditScreen point={sideBarStatesEnum.RouteEnd}/>

    case sideBarStatesEnum.Add: return <AddToilet />

    case sideBarStatesEnum.Review: return <ReviewScreen />

    case sideBarStatesEnum.Find: return <FindScreen />


    default: return <ExampleScreen />
  }

}







const SideBar = () => {

  const sideBarState = useSelector((state:RootState) => state.sideBar.state)

  const showSideBar = ():boolean => {
    return sideBarState != sideBarStatesEnum.None;
  }


  return(
    <div className={`transition-all ${showSideBar()?"opacity-100":"opacity-0 -ml-[100%]"} absolute top-0 left-0 md:bottom-10 max-w-[100vw] w-full md:w-[35vw] md:rounded-br-lg md:overflow-scroll shadow-lg z-20 bg-white`}>
      <SideBarTop />
      <SideBarScreen />
    </div>
  )
}

export default SideBar