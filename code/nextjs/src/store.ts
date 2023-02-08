import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/components/slice/test'
import menuReducer from '@/components/slice/menu'
import sideBarReducer from '@/components/slice/sideBar'
import userReducer from '@/components/slice/user'
import systemReducer from '@/components/slice/system'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    menu: menuReducer,
    sideBar: sideBarReducer,
    user: userReducer,
    system: systemReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch