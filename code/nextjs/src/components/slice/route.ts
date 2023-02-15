import {createSlice, PayloadAction} from "@reduxjs/toolkit";





export type Route = {
  start: string,
  end: string,

}


const initState:Route = {
  start: "",
  end: ""
}

export const systemSlice = createSlice({
  name: 'route',
  initialState: initState,
  reducers: {
      setStart: (state, action:PayloadAction<string>) => {
        state.start = action.payload
    },
      setEnd: (state, action:PayloadAction<string>) => {
        state.end = action.payload
    },
  }
})


export default systemSlice.reducer
export const { setStart, setEnd } = systemSlice.actions