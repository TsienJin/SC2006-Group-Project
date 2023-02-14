import {combineReducers, configureStore} from '@reduxjs/toolkit'
import counterReducer from '@/components/slice/test'
import menuReducer from '@/components/slice/menu'
import sideBarReducer from '@/components/slice/sideBar'
import userReducer from '@/components/slice/user'
import systemReducer from '@/components/slice/system'
import routeReducer from '@/components/slice/route'

import * as process from "process"
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const allReducers = combineReducers({
  counter: counterReducer,
  menu: menuReducer,
  sideBar: sideBarReducer,
  user: userReducer,
  system: systemReducer,
  route: routeReducer
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch