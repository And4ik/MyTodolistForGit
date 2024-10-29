import { todolistsReducer } from "features/Todolist/todolistsSlice"
import { UnknownAction } from "redux"
import { tasksReducer } from "features/Todolist/Todolist/Task/tasksSlice"
import { ThunkAction } from "redux-thunk"
import { useDispatch } from "react-redux"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

export type AppDispatch = typeof store.dispatch

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
