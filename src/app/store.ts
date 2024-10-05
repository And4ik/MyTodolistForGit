import {TodolistActionsType, todolistsReducer} from '../features/Todolist/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import { TaskActionsType, tasksReducer} from "../features/Todolist/task-reducer";
import {thunk, ThunkDispatch} from 'redux-thunk'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, SetAppErrorActionType, SetAppStatusActionType} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));
// определить автоматиче ски тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//типизации диспатча для работы дополнительно с санками
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
//универсальный тиипизированный хук useDispatch
export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//все экшены для всего app
export type AppActionsType =
    | TodolistActionsType
    | TaskActionsType
    | SetAppStatusActionType
    | SetAppErrorActionType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
