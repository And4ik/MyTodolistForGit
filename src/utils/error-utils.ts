import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/appSlice"
import { ResponseTodolistType } from "../api/todolist-api"
import { ResponseTaskType } from "../api/task-api"

export const handleServerAppError = (dispatch: Dispatch, data: ResponseTodolistType | ResponseTaskType) => {
  dispatch(setAppError({ error: data.messages.length ? data.messages[0] : "Some error occurred" }))
  dispatch(setAppStatus({ status: "failed" }))
}

export const handleServerNetworkError = (dispatch: Dispatch, error: { message: string }) => {
  dispatch(setAppError({ error: error.message }))
  dispatch(setAppStatus({ status: "failed" }))
}
