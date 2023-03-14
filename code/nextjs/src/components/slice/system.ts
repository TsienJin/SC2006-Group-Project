import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export enum SystemLang {
  English = "english"
}


export type System = {
  language: SystemLang,
  showToilet: boolean,
  showTraffic: boolean,
}


const initState:System = {
  language: SystemLang.English,
  showToilet: true,
  showTraffic: true,
}

export const systemSlice = createSlice({
  name: 'system',
  initialState: initState,
  reducers: {
    setLang: (state, action:PayloadAction<SystemLang>) => {
      state.language = action.payload
    },
    setToilet: (state, action:PayloadAction<boolean>) => {
      state.showToilet = action.payload
    },
    setTraffic: (state, action:PayloadAction<boolean>) => {
      state.showTraffic = action.payload
    },
  }
})


export default systemSlice.reducer
export const { setLang, setToilet, setTraffic } = systemSlice.actions