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
}


const initialState:sideBarStates = {
  state: sideBarStatesEnum.None,
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
    }
  }
})


export const { setState } = sideBarSlice.actions
export default sideBarSlice.reducer

