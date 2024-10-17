import { todolistsReducer } from "features/Todolist/todolistsSlice"
import { UnknownAction } from "redux"
import { tasksReducer } from "features/Todolist/tasksSlice"
import { ThunkAction } from "redux-thunk"
import { useDispatch } from "react-redux"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/Login/authSlice"
import { configureStore } from "@reduxjs/toolkit"

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
})
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = typeof store.dispatch

//универсальный тиипизированный хук useDispatch
export const useAppDispatch = useDispatch<AppDispatchType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

//все экшены для всего app

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
