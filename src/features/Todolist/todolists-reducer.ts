import { todolistApi, TodolistType } from "../../api/todolist-api"
import { AppDispatchType, AppThunk } from "../../app/store"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"
import { getTasksTC } from "./task-reducer"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
//статус для блокировки

const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }))
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.id)
    case "ADD-TODOLIST":
      return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state]
    case "CHANGE-TODOLIST-TITLE":
      return state.map((el) => (el.id === action.id ? { ...el, title: action.title } : el))
    case "CHANGE-TODOLIST-FILTER":
      return state.map((el) => (el.id === action.id ? { ...el, filter: action.filter } : el))
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((tl) => (tl.id === action.todoId ? { ...tl, entityStatus: action.status } : tl))
    case "CLEAR-DATA":
      return []
    default:
      return state
  }
}

//actions
export const RemoveTodolistAC = (id: string) => ({ type: "REMOVE-TODOLIST", id }) as const
export const AddTodolistAC = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist }) as const
export const UpdateTodolistAC = (id: string, title: string) => ({ type: "CHANGE-TODOLIST-TITLE", id, title }) as const
export const ChangeFilterAC = (id: string, filter: FilterValuesType) =>
  ({ type: "CHANGE-TODOLIST-FILTER", id, filter }) as const
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({ type: "SET-TODOLISTS", todolists }) as const
export const changeTodolistEntityStatusAC = (todoId: string, status: RequestStatusType) =>
  ({ type: "CHANGE-TODOLIST-ENTITY-STATUS", todoId, status }) as const
export const ClearTodosDataAC = () => ({ type: "CLEAR-DATA" }) as const

//thunks
export const getTodolistsTC = (dispatch: AppDispatchType) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatus({ status: "succeeded" }))
      return res.data
    })
    .then((todos) => {
      todos.forEach((tl) => {
        dispatch(getTasksTC(tl.id))
      })
    })
}

export const deleteTodolistTC =
  (todoId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatusAC(todoId, "loading"))
    todolistApi.deleteTodolist(todoId).then((res) => {
      dispatch(RemoveTodolistAC(todoId))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
  }
export const createTodolistTC =
  (title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(AddTodolistAC(res.data.data.item))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }
export const changeTodolistTitleTC =
  (todoId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistApi
      .updateTodolist(todoId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(UpdateTodolistAC(todoId, title))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }

//types
export type TodolistActionsType =
  | SetTodolistsActionType
  | AddTodolistActionsType
  | RemoveTodolistActionsType
  | ReturnType<typeof UpdateTodolistAC>
  | ReturnType<typeof ChangeFilterAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ClearDataActionType

export type RemoveTodolistActionsType = { type: "REMOVE-TODOLIST"; id: string }
export type AddTodolistActionsType = {
  type: "ADD-TODOLIST"
  todolist: TodolistType
}
export type SetTodolistsActionType = {
  type: "SET-TODOLISTS"
  todolists: Array<TodolistType>
}
export type ClearDataActionType = ReturnType<typeof ClearTodosDataAC>
