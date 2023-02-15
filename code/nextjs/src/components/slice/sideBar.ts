import { createAction, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import sideBar from "@/components/overlays/sideBar/SideBar";



export enum sideBarStatesEnum {
  None='none',
  Settings='settings',
  Account='account',
  AccountLogin='accountLogin',
  AccountCreate='accountCreate',
  AccountForget='accountForget',
  AccountEditName='accountName',
  AccountEditEmail='accountEmail',
  AccountEditPassword='accountPassword',
  Route='route',
  RouteStart='routeStart',
  RouteEnd='routeEnd',
  RouteOptions='routeOptions',
  Favourites='favourites',
  Find='find',
  Add='add',
  Review='review',
  Test='test',
}

export type sideBarStates = {
  state: sideBarStatesEnum,
  stack: sideBarStatesEnum[]
}


const initialState:sideBarStates = {
  state: sideBarStatesEnum.None,
  stack: []
}

// export const sideBarAction = createAction<sideBarStatesEnum|string|undefined>("SIDEBAR")

export function sideBarDispatch (dispatch:any, state: sideBarStatesEnum) {
  dispatch(setState(state))
}

export const sideBarSlice = createSlice({
  name: 'sideBar',
  initialState: initialState,
  reducers: {
    setState: (sideBar, action: PayloadAction<sideBarStatesEnum>) => {
      sideBar.state = action.payload
    },
    clearThenAddToStack: (sideBar, action: PayloadAction<sideBarStatesEnum>) => {
      if(action.payload != sideBarStatesEnum.None){
        sideBar.stack = [action.payload]
      } else {
        sideBar.stack = []
      }
    },
    clearStack: (sideBar)=>{
      sideBar.stack = []
    },
    addToStack: (sideBar, action: PayloadAction<sideBarStatesEnum>) => {
      if(action.payload != sideBarStatesEnum.None){
        sideBar.stack.push(action.payload)
      }
    },
    // TO DEPRECIATE
    popStack: (sideBar) => {
      if(sideBar.stack.length){
        sideBar.stack.pop()
      }
    },
    popLatest: (sideBar, action:PayloadAction<sideBarStatesEnum>) => {
      const index = sideBar.stack.indexOf(action.payload)
      if(index > -1){
        sideBar.stack.splice(index, 1)
    }
    }
  }
})


export const { setState, clearThenAddToStack, clearStack, addToStack, popStack, popLatest } = sideBarSlice.actions
export default sideBarSlice.reducer

