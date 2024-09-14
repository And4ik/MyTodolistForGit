import { todolistsReducer } from '../features/Todolist/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {tasksReducer} from "../features/Todolist/task-reducer";
import {thunk, ThunkDispatch} from 'redux-thunk'
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

//типизации диспатча для работы дополнительно с санками
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
//универсальный тиипизированный хук useDispatch
export const useAppDispatch = useDispatch<AppDispatchType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
