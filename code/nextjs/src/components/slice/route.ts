import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Coordinates, emptyCoords} from "@/components/slice/location";





export enum RoutePoint {
  Start = "start",
  End = "End"
}


export type Route = {
  start: Coordinates,
  end: Coordinates,
  options: {
    avoidTolls: boolean,
    avoidMotor: boolean
  }
  route?:any,

}


const initState:Route = {
  start: emptyCoords,
  end: emptyCoords,
  options: {
    avoidTolls: false,
    avoidMotor: false
  }
}

export const systemSlice = createSlice({
  name: 'route',
  initialState: initState,
  reducers: {
    setStart: (state, action:PayloadAction<Coordinates>) => {
      state.start = action.payload
    },
    setEnd: (state, action:PayloadAction<Coordinates>) => {
      state.end = action.payload
    },
    setRoute: (state, action:PayloadAction<any>) => {
      state.route = action.payload
    },
    setAvoidTolls: (state, action:PayloadAction<boolean>) => {
      state.options.avoidTolls = action.payload
    },
    setAvoidMotor: (state, action:PayloadAction<boolean>) => {
      state.options.avoidMotor = action.payload
    }
  }
})


export default systemSlice.reducer
export const {
  setStart,
  setEnd,
  setRoute,
  setAvoidTolls,
  setAvoidMotor,
} = systemSlice.actions