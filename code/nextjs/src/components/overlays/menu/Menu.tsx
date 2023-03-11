import { RootState } from "@/store"
import React from "react"
import { useSelector } from "react-redux"
import { AccountItem, AddItem, ExpandItem, FavItem, RouteItem, SearchItem, SettingItem, TestItem } from "./MenuItems"



const Menu = () => {

  const expState = useSelector((state:RootState) => state.menu.expanded)

  return (
    <nav className={`absolute bottom-6 right-6 z-10 flex flex-col ${expState?"gap-y-4":"gap-y-0"}`}>
      <ExpandItem />
      <SettingItem />
      <AccountItem />
      <RouteItem />
      <FavItem />
      <SearchItem />
      <AddItem />
      {/*<TestItem />*/}
    </nav>
  )
}
export default Menu