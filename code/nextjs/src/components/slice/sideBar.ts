import { createAction, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"



export enum sideBarStatesEnum {
  None='none',
  Settings='settings',
  Account='account',
  AccountLogin='accountLogin',
  AccountCreate='accountCreate',
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
    addToStack: (sideBar, action: PayloadAction<sideBarStatesEnum>) => {
      if(action.payload != sideBarStatesEnum.None){
        sideBar.stack.push(action.payload)
      }
    },
    popStack: (sideBar) => {
      if(sideBar.stack.length){
        sideBar.stack.pop()
      }
    }
  }
})


export const { setState, clearThenAddToStack, addToStack, popStack } = sideBarSlice.actions
export default sideBarSlice.reducer

