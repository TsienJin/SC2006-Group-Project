import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Coordinates = {
  name?: string,
  address?: string,
  latitude: number|any,
  longitude: number|any,
  found?: boolean,
}

export function coordinatesFromGeoCoords(geolocation:GeolocationCoordinates):Coordinates {
  return{
    // accuracy: geolocation.accuracy,
    // altitude: geolocation.altitude,
    // altitudeAccuracy: geolocation.altitudeAccuracy,
    // heading: geolocation.heading,
    latitude: geolocation.latitude,
    longitude: geolocation.longitude,
    // speed: geolocation.speed
  }
}


const initGeolocation:Coordinates = {
  // altitude: 0,
  // altitudeAccuracy: 0,
  // heading: 0,
  latitude: 1.3516161224392,
  longitude: 103.808052586332,
  found: false
  // speed: 0,
  // accuracy: 0
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