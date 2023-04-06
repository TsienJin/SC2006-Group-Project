import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum notiType {
  Warning = "warning",
  Notification = "notification"
}

export type notiContent = {
  id: string,
  title: string,
  text: string|any,
  type?: notiType
}
export function createNoti(title:notiContent["title"], text:notiContent["text"], type:notiContent["type"]=notiType.Notification):notiContent {
  return {
    id: (Math.random() + 1).toString(36).substring(7),
    title: title,
    text: text,
    type: type
  }
}

export type notiState = {
  notifications: notiContent[]
}

const initialState:notiState = {
  notifications: [
    createNoti(
      "Development environment!",
      "This website's environment is set to DEV! Duplicate notifications may be seen.",
      notiType.Warning
    ),
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