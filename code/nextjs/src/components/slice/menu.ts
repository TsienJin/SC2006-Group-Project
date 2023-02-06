import {createSlice} from "@reduxjs/toolkit"


export type menuState = {
  expanded: boolean,
  hidden: boolean,
}

const initialState:menuState = {
  expanded: false,
  hidden: false
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {
    expand: state => {
      state.expanded = true
    },
    collapse: state => {
      state.expanded = false
    },
    toggleExpand: state => {
      state.expanded = !state.expanded
    },
    hide: state => {
      state.hidden = true
    },
    show: state => {
      state.hidden = false
    },
    reset: state => {
      state.hidden = false
      state.expanded = false
    }
  }
})


export const { expand, collapse, toggleExpand, hide, show, reset } = menuSlice.actions
export default menuSlice.reducer