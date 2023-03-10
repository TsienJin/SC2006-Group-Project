import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {act} from "react-dom/test-utils";

export type notiContent = {
  id: string,
  title: string,
  text: string,
}

export function createNoti(title:string, text:string):notiContent {
  return {
    id: (Math.random() + 1).toString(36).substring(7),
    title: title,
    text: text
  }
}

export type notiState = {
  notifications: notiContent[]
}

const initialState:notiState = {
  notifications: [
  ]
}

export const notiSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {
    addNoti: (state, action:PayloadAction<notiContent>) => {

      console.log(state.notifications)
      if(!state.notifications.includes(action.payload)){
        state.notifications.push(action.payload)
      }
    },
    popNoti: (state, action:PayloadAction<string>) => {
      const index = state.notifications.findIndex(o => o.id === action.payload)
      if(index > -1) {
        state.notifications.splice(index, 1)
      }
    }
  }
})


export const {addNoti, popNoti} = notiSlice.actions
export default notiSlice.reducer