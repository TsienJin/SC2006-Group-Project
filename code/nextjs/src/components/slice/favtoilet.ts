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
      if(state.favourites.indexOf(action.payload) < 0){
        state.favourites.push(action.payload)
      }
    },
    removeFav: (state, action:PayloadAction<ToiletInfo>) => {
      // const index = state.favourites.indexOf(action.payload)
      // if(index > -1){
      //   console.log(index)
      //   state.favourites.splice(index, 1)
      // }

      let index = -1
      for(let i=0; i<state.favourites.length; i++){
        if(state.favourites[i].Address.address == action.payload.Address.address){
          index = i
        }
      }

      if(index>=0){
        state.favourites.splice(index, 1)
      }

    },
    clearFav: (state) => {
      state.favourites = []
    }
  }
})

export const { addFav, removeFav, clearFav } = favToiletSlice.actions
export default favToiletSlice.reducer