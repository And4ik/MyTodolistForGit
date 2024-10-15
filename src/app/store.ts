import { TodolistActionsType, todolistsReducer } from "../features/Todolist/todolists-reducer"
import { combineReducers, UnknownAction } from "redux"
import { TaskActionsType, tasksReducer } from "../features/Todolist/task-reducer"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "app/appSlice"
import { authReducer } from "features/Login/authSlice"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

// export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof rootReducer>

//типизации диспатча для работы дополнительно с санками
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>

//универсальный тиипизированный хук useDispatch
export const useAppDispatch = useDispatch<AppDispatchType>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>

//все экшены для всего app
export type AppActionsType = TodolistActionsType | TaskActionsType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
