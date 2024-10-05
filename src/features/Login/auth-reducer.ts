import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setIsInitializedAC,} from '../../app/app-reducer'
import {authApi} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {LoginFormType} from "./Login";
import {ClearTodosDataAC} from "../Todolist/todolists-reducer";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value}) as const

// thunks
export const loginTC = (data: LoginFormType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleServerNetworkError(dispatch, error)
        })
}
export const meTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleServerNetworkError(dispatch, error)
        })
        .finally(()=> {
            dispatch(setIsInitializedAC(true))
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logOut()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                dispatch(ClearTodosDataAC())
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleServerNetworkError(dispatch, error)
        })
        .finally(()=> {
            dispatch(setIsInitializedAC(true))
        })
}

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
