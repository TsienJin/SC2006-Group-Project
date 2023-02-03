import { toggleExpand } from "@/components/slice/menu"
import { clearThenAddToStack, popStack } from '@/components/slice/sideBar'
import { sideBarDispatch, sideBarStatesEnum } from "@/components/slice/sideBar"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import MenuItemWrapper from "./MenuItemWrapper"




// function to update side bar and close menu bar
function menuItemClick(dispatch:any, destination: sideBarStatesEnum): void {
  sideBarDispatch(dispatch, destination)
  dispatch(clearThenAddToStack(destination))
  setTimeout(()=>{
    dispatch(toggleExpand())
  }, 250)
}






// Wrapper to style and contain vector icons to standardise style
const VectorWrapper = ({children}:{children?:any}) => {

  return(
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
        {children}
      </svg>
    </div>
  )
}


const ExpandItem = () => {

  const expState = useSelector((state:RootState) => state.menu.expanded)
  const dispatch = useDispatch()

  return (
    <MenuItemWrapper isTop={true} handler={()=>{dispatch(toggleExpand())}}>
      <div className={`transition-all delay-150 ${expState?"rotate-180":"rotate-0"}`}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </VectorWrapper>
      </div>
    </MenuItemWrapper>
  )
}

const SettingItem = () => {

  const dispatch = useDispatch()

  return (
    <MenuItemWrapper handler={()=>menuItemClick(dispatch, sideBarStatesEnum.Settings)}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const AccountItem = () => {

  const dispatch = useDispatch()

  return (
    <MenuItemWrapper handler={()=>menuItemClick(dispatch, sideBarStatesEnum.Account)}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const RouteItem = () => {
  
  const dispatch = useDispatch()

  return (
    <MenuItemWrapper handler={()=>menuItemClick(dispatch, sideBarStatesEnum.Route)}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const FavItem = () => {

  const dispatch = useDispatch()

  return (
    <MenuItemWrapper handler={()=>menuItemClick(dispatch, sideBarStatesEnum.Favourites)}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const SearchItem = () => {

  const dispatch = useDispatch()

  return (
    <MenuItemWrapper handler={()=>menuItemClick(dispatch, sideBarStatesEnum.Find)}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const AddItem = () => {

  const dispatch = useDispatch()

  return (
    <MenuItemWrapper handler={()=>menuItemClick(dispatch, sideBarStatesEnum.Add)}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const TestItem = () => {

  const dispatch = useDispatch()

  return (
    <MenuItemWrapper handler={()=>menuItemClick(dispatch, sideBarStatesEnum.None)}>
        <VectorWrapper>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

export {
  ExpandItem,
  SettingItem,
  AccountItem,
  RouteItem,
  FavItem,
  SearchItem,
  AddItem,
  TestItem
}