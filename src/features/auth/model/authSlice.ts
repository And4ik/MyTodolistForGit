import { setAppStatus, setIsInitialized } from "app/appSlice"
import { authApi } from "features/auth/api/authApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

import { clearTasksAndTodolists } from "features/Todolist/todolistsSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { LoginParamsType } from "features/auth/api/authApi.types"

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
  (data: LoginParamsType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authApi
      .login(data)
      .then((res) => {
        if (res.data.resultCode === ResultCode.success) {
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
      if (res.data.resultCode === ResultCode.success) {
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
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(clearTasksAndTodolists())
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
