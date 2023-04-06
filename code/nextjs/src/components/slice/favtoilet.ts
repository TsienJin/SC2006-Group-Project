import {ToiletInfo} from "@/components/mapbox/Markers/toilet";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type favToiletState = {
  favourites: ToiletInfo[]
}

const initialState:favToiletState = {
  favourites: []
}

export const favToiletSlice = createSlice({
  name: "favToilet",
  initialState: initialState,
  reducers: {
    addFav: (state, action:PayloadAction<ToiletInfo>) => {
      state.favourites.push(action.payload)

      state.favourites = Array.from(new Set(state.favourites))
    },
    removeFav: (state, action:PayloadAction<ToiletInfo>) => {
      const index = state.favourites.indexOf(action.payload)
      if(index > -1){
        state.favourites.splice(index, 1)
        
      }
    },
  }
})

export const { addFav, removeFav } = favToiletSlice.actions
export default favToiletSlice.reducer