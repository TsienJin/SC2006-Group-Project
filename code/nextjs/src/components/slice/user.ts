import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type User = {
  name: string,
  email: string,
  id: string
}

const initState:User = {
  name: '',
  email: '',
  id: ''
}



export const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    logout: (state) => {
      state.name = ""
      state.email = ""
      state.id = ""
    },
    login: (state, action:PayloadAction<User>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.id = action.payload.email
    }
  }
})



export default userSlice.reducer
export const { logout, login } = userSlice.actions