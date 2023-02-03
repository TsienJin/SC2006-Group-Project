import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export type counterState = {
  value: number
}

const initState:counterState = {
  value: 0
}


export const counterSlice = createSlice({
  name: 'counter',
  initialState: initState,
  reducers: {
    increment: state => {
      state.value+=1
    },
    decrement: state => {
      state.value-=1
    },
    change: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
    reset: state => {
      state.value = 0
    }
  },
})

export const { increment, decrement, change, reset } = counterSlice.actions
export default counterSlice.reducer
