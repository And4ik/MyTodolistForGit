import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseTodolistType} from "../api/todolist-api";
import {ResponseTaskType} from "../api/task-api";

export const handleServerNetworkError = (dispatch: Dispatch, error: { message: string })=> {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = (dispatch: Dispatch, data: ResponseTodolistType | ResponseTaskType)=> {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0]: "Some error occurred"))
    dispatch(setAppStatusAC("failed"))
}