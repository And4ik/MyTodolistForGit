import { TasksStateType } from "../../trash/App"
import {
  AddTodolistActionsType,
  ClearDataActionType,
  RemoveTodolistActionsType,
  SetTodolistsActionType,
} from "./todolists-reducer"
import { taskApi, TaskStatuses, TaskType, UpdateTaskModelType } from "../../api/task-api"
import { AppThunk } from "../../app/store"
import { setAppError, setAppStatus } from "app/appSlice"
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils"

const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action: TaskActionsType): TasksStateType => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      const stateCopy = { ...state }
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case "SET-TASKS":
      return { ...state, [action.todolistId]: action.tasks }
    case "REMOVE-TASK":
      return { ...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId) }
    case "ADD-TASK":
      return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, status: action.status } : t,
        ),
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t,
        ),
      }
    case "ADD-TODOLIST":
      return { ...state, [action.todolist.id]: [] }
    case "REMOVE-TODOLIST":
      const {
        [action.id]: [],
        ...rest
      } = state
      return rest
    case "CLEAR-DATA":
      return {}
    default:
      return state
  }
}

//actions
export const RemoveTaskAC = (taskId: string, todolistId: string) =>
  ({ type: "REMOVE-TASK", taskId, todolistId }) as const
export const AddTaskAC = (task: TaskType) => ({ type: "ADD-TASK", task }) as const
export const ChangeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
  ({ type: "CHANGE-TASK-STATUS", todolistId, taskId, status }) as const
export const ChangeTaskTitleAC = (todolistId: string, taskId: string, title: string) =>
  ({ type: "CHANGE-TASK-TITLE", todolistId, taskId, title }) as const
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
  ({ type: "SET-TASKS", tasks, todolistId }) as const

//thunks
export const getTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    taskApi.getTasks(todolistId).then((res) => {
      dispatch(setTasksAC(res.data.items, todolistId))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
  }

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    taskApi.deleteTask(todolistId, taskId).then((res) => {
      dispatch(RemoveTaskAC(taskId, todolistId))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
  }

export const createTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    taskApi
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(AddTaskAC(res.data.data.item))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          dispatch(setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Some error occurred" }))
          dispatch(setAppStatus({ status: "failed" }))
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }

export const updateTaskStatusTC =
  (todoId: string, taskId: string, status: TaskStatuses): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const task = state.tasks[todoId].find((t) => t.id === taskId)
    if (task) {
      const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: status,
      }
      dispatch(setAppStatus({ status: "loading" }))
      taskApi
        .updateTask(todoId, taskId, model)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(ChangeTaskStatusAC(taskId, status, todoId))
            dispatch(setAppStatus({ status: "succeeded" }))
          } else {
            handleServerAppError(dispatch, res.data)
          }
        })
        .catch((error) => {
          handleServerNetworkError(dispatch, error)
        })
    }
  }

export const updateTaskTitleTC =
  (todoId: string, taskId: string, title: string): AppThunk =>
  (dispatch, getState) => {
    const state = getState()
    const task = state.tasks[todoId].find((t) => t.id === taskId)
    if (task) {
      const model: UpdateTaskModelType = {
        title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
      }
      dispatch(setAppStatus({ status: "loading" }))
      taskApi
        .updateTask(todoId, taskId, model)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(ChangeTaskTitleAC(todoId, taskId, title))
            dispatch(setAppStatus({ status: "succeeded" }))
          } else {
            handleServerAppError(dispatch, res.data)
          }
        })
        .catch((error) => {
          handleServerNetworkError(dispatch, error)
        })
    }
  }

//types
export type TaskActionsType =
  | ReturnType<typeof RemoveTaskAC>
  | ReturnType<typeof AddTaskAC>
  | ReturnType<typeof ChangeTaskStatusAC>
  | ReturnType<typeof ChangeTaskTitleAC>
  | AddTodolistActionsType
  | RemoveTodolistActionsType
  | SetTodolistsActionType
  | ReturnType<typeof setTasksAC>
  | ClearDataActionType
