import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type Coordinates = {
  altitude: number|any,
  altitudeAccuracy: number|any,
  heading: number|any,
  latitude: number|any,
  longitude: number|any,
  speed: number|any,
  accuracy: number|any
}

export function coordinatesFromGeoCoords(geolocation:GeolocationCoordinates):Coordinates {
  return{
    accuracy: geolocation.accuracy,
    altitude: geolocation.altitude,
    altitudeAccuracy: geolocation.altitudeAccuracy,
    heading: geolocation.heading,
    latitude: geolocation.latitude,
    longitude: geolocation.longitude,
    speed: geolocation.speed
  }
}


const initGeolocation:Coordinates = {
  altitude: 0,
  altitudeAccuracy: 0,
  heading: 0,
  latitude: 0,
  longitude: 0,
  speed: 0,
  accuracy: 0
}

const initState = {
  coords: initGeolocation
}


export const locationSlice = createSlice({
  name: 'location',
  initialState: initState,
  reducers: {
    update: (state, action:PayloadAction<Coordinates>) => {
      state.coords = action.payload
    },
    reset: (state) => {
      state.coords = initGeolocation
    }
  }
})


export default locationSlice.reducer
export const { update, reset } = locationSlice.actions