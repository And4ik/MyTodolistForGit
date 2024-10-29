import { Dispatch } from "redux"

import { setAppError, setAppStatus } from "app/appSlice"
import { BaseResponse } from "common/type/types"

export const handleServerAppError = <D>(dispatch: Dispatch, data: BaseResponse<D>) => {
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  dispatch(setAppStatus({ status: "failed" }))
}
