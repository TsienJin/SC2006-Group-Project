import toilet, {ToiletInfo} from "@/components/mapbox/Markers/toilet";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initState:ToiletInfo = {
  Address: {
    Description: {description: "", isPublic: false, locationType: ""},
    address: "",
    averageRating: 0,
    coordinates: {latitude: 0, longitude: 0},
    floorNumber: "",
    name: "",
    postalCode: "",
    reviews: [],
    unitNumber: ""
  }
}


export const toiletInterestSlice = createSlice({
  name: 'toiletInterest',
  initialState: initState,
  reducers: {
    setToiletInterest: (state, action:PayloadAction<ToiletInfo>) => {
      state.Address = action.payload.Address
    },
    clearToiletInterest: state => {
      state.Address = initState.Address
    }
  }
})


export const {setToiletInterest, clearToiletInterest} = toiletInterestSlice.actions
export default toiletInterestSlice.reducer