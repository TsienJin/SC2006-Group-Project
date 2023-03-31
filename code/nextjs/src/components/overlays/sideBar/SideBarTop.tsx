import {clearStack, popStack, setState, sideBarStatesEnum} from "@/components/slice/sideBar"
import {RootState} from "@/store"
import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react";


const SideBarTop = () => {

  const sideBarState = useSelector((state:RootState) => state.sideBar.state)
  const stackState = useSelector((state:RootState) => state.sideBar.stack)
  const [title, setTitle] = useState<string>(sideBarState)
  const dispatch = useDispatch()


  const getTitle = () => {
    switch (stackState[stackState.length-1]) {
      case sideBarStatesEnum.Settings:
        return "Settings"

      case sideBarStatesEnum.Account:
      case sideBarStatesEnum.AccountLogin:
      case sideBarStatesEnum.AccountCreate:
      case sideBarStatesEnum.AccountForget:
      case sideBarStatesEnum.AccountEditName:
      case sideBarStatesEnum.AccountEditEmail:
      case sideBarStatesEnum.AccountEditPassword:
        return "Account"

      case sideBarStatesEnum.Route:
      case sideBarStatesEnum.RouteStart:
      case sideBarStatesEnum.RouteEnd:
      case sideBarStatesEnum.RouteOptions:
        return "Route"

      case sideBarStatesEnum.Favourites:
        return "Favourites"

      case sideBarStatesEnum.Find:
        return "Find"

      case sideBarStatesEnum.Add:
        return "Add"

      case sideBarStatesEnum.Review:
        return "Review"

      case sideBarStatesEnum.Test:
        return "Test"

      default:
        return "Empty title"
    }
  }

  useEffect(()=>{
    if(sideBarState!=sideBarStatesEnum.None){
      setTitle(getTitle())
    }
  },[sideBarState]) // eslint-disable-line

  const handleBack = () => {
    if(stackState.length<=1){
      dispatch(setState(sideBarStatesEnum.None))
      dispatch(clearStack())
    } else {
      setTitle(getTitle())
      // dispatch(setState(stackState[stackState.length-1]))
      dispatch(popStack())
    }
  }

  return(
    <div className="bg-white text-violet p-3 shadow sticky z-30 top-0 flex flex-row justify-between items-center">
      <button onClick={handleBack} className="rounded transition-all md:hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      {getTitle()}
      <span></span>
    </div>
  )
}


export default SideBarTop