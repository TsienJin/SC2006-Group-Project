import toilet, {ToiletInfo} from "@/components/mapbox/Markers/toilet";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initState:ToiletInfo = {
  Address: {
    address: "",
    coordinates: {latitude: 0, longitude: 0},
    floorNumber: "",
    name: "",
    postalCode: "",
    unitNumber: "",
    Description: {description: "", isPublic: false, locationType: ""},
    reviews: [],
  },
  averageRating: 0
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