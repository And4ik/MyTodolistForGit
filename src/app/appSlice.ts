import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

// const initialState = {
//   status: "idle" as RequestStatusType,
//   error: null as string | null,
//   isInitialized: false,
// }
const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  selectors: {
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
    selectIsInitialized: (state) => state.isInitialized,
  },
})

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError, setIsInitialized } = appSlice.actions
export const { selectError, selectStatus, selectIsInitialized } = appSlice.selectors
// export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status }) as const
// export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const
// export const setIsInitializedAC = (isInitialized: boolean) => ({ type: "APP/SET-INITIALIZED", isInitialized }) as const

// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>
//
// type ActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedActionType
