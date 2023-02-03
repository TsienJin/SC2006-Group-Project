import { toggleExpand } from "@/components/slice/menu"
import { RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import MenuItemWrapper from "./MenuItemWrapper"



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

  const toggle = () => {
    dispatch(toggleExpand())
  }

  return (
    <MenuItemWrapper isTop={true} handler={toggle}>
      <div className={`transition-all ${expState?"rotate-180":"rotate-0"}`}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </VectorWrapper>
      </div>
    </MenuItemWrapper>
  )
}

const SettingItem = () => {

  return (
    <MenuItemWrapper handler={()=>console.log("setting")}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const AccountItem = () => {

  return (
    <MenuItemWrapper handler={()=>console.log("Account")}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const RouteItem = () => {

  return (
    <MenuItemWrapper handler={()=>console.log("Route")}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const FavItem = () => {

  return (
    <MenuItemWrapper handler={()=>console.log("Fav")}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const SearchItem = () => {

  return (
    <MenuItemWrapper handler={()=>console.log("Search")}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </VectorWrapper>
    </MenuItemWrapper>
  )
}

const AddItem = () => {

  return (
    <MenuItemWrapper handler={()=>console.log("Add")}>
        <VectorWrapper>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
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
  AddItem
}