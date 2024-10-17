import { todolistApi, TodolistType } from "api/todolist-api"
import { AppDispatchType, AppThunk } from "app/store"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { getTasksTC } from "features/Todolist/tasksSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
//статус для блокировки

const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    RemoveTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    AddTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    //UpdateTodolistAC
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    //changeFilter
    ChangeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.status
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
      //1 var
      // return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      //2 var
      action.payload.todolists.forEach((tl) => {
        state.push({ ...tl, filter: "all", entityStatus: "idle" })
      })
    },
    ClearTodosData: (state) => {
      state.splice(0, state.length)
    },
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})
export const todolistsReducer = todolistsSlice.reducer
export const {
  RemoveTodolist,
  AddTodolist,
  changeTodolistTitle,
  ChangeTodolistFilter,
  setTodolists,
  changeTodolistEntityStatus,
  ClearTodosData,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

//thunks
export const getTodolistsTC = (dispatch: AppDispatchType) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists({ todolists: res.data }))
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
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatus({ id, status: "loading" }))
    todolistApi.deleteTodolist(id).then(() => {
      dispatch(RemoveTodolist({ id }))
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
          dispatch(AddTodolist({ todolist: res.data.data.item }))
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
  (id: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistApi
      .updateTodolist(id, title)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(changeTodolistTitle({ id, title }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(dispatch, res.data)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }
