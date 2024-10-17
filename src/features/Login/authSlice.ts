import { setAppStatus, setIsInitialized } from "app/appSlice"
import { authApi } from "api/auth-api"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { LoginFormType } from "./Login"
import { ClearTodosData } from "features/Todolist/todolistsSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})
export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions
export const { selectIsLoggedIn } = authSlice.selectors
// thunks
export const loginTC =
  (data: LoginFormType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi
      .login(data)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }
export const meTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
}

export const logOutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .logOut()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(ClearTodosData())
      } else {
        handleServerAppError(dispatch, res.data)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
    .finally(() => {
      dispatch(setIsInitialized({ isInitialized: true }))
    })
}
