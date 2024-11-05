import { todolistApi, TodolistType } from "features/Todolist/api/todolist-api"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { CreateAppAsyncThunk } from "common/utils/createAppAsyncThunk"

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
    // RemoveTodolist: (state, action: PayloadAction<{ id: string }>) => {
    //   const index = state.findIndex((tl) => tl.id === action.payload.id)
    //   if (index !== -1) {
    //     state.splice(index, 1)
    //   }
    // },
    // AddTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
    //   state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    // },
    //UpdateTodolistAC
    // changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
    //   const index = state.findIndex((tl) => tl.id === action.payload.id)
    //   if (index !== -1) {
    //     state[index].title = action.payload.title
    //   }
    // },
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
    // setTodolists: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
    //   //1 var
    //   // return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    //   //2 var
    //   action.payload.todolists.forEach((tl) => {
    //     state.push({ ...tl, filter: "all", entityStatus: "idle" })
    //   })
    // },
    clearTasksAndTodolists: () => {
      return []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (_, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return []
      })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})
export const todolistsReducer = todolistsSlice.reducer
export const { ChangeTodolistFilter, changeTodolistEntityStatus, clearTasksAndTodolists } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

//thunks
export const fetchTodolists = CreateAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${todolistsSlice.name}/fetchTodolists`,
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistApi.getTodolists()
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolists: res.data }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)
// export const getTodolistsTC = (dispatch: AppDispatch) => {
//   dispatch(setAppStatus({ status: "loading" }))
//   todolistApi
//     .getTodolists()
//     .then((res) => {
//       dispatch(setTodolists({ todolists: res.data }))
//       dispatch(setAppStatus({ status: "succeeded" }))
//       return res.data
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch)
//     })
// }

export const removeTodolist = CreateAppAsyncThunk<{ id: string }, string>(
  `${todolistsSlice.name}/removeTodolist`,
  async (id, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      dispatch(changeTodolistEntityStatus({ id, status: "loading" }))
      const res = await todolistApi.deleteTodolist(id)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { id }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

// export const deleteTodolistTC =
//   (id: string): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: "loading" }))
//     dispatch(changeTodolistEntityStatus({ id, status: "loading" }))
//     todolistApi.deleteTodolist(id).then(() => {
//       dispatch(RemoveTodolist({ id }))
//       dispatch(setAppStatus({ status: "succeeded" }))
//     })
//   }

export const addTodolist = CreateAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${todolistsSlice.name}/addTodolist `,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistApi.createTodolist(title)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { todolist: res.data.data.item }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

// export const createTodolistTC =
//   (title: string): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: "loading" }))
//     todolistApi
//       .createTodolist(title)
//       .then((res) => {
//         if (res.data.resultCode === ResultCode.success) {
//           dispatch(AddTodolist({ todolist: res.data.data.item }))
//           dispatch(setAppStatus({ status: "succeeded" }))
//         } else {
//           handleServerAppError(dispatch, res.data)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(dispatch, error)
//       })
//   }

export const changeTodolistTitle = CreateAppAsyncThunk<{ id: string; title: string }, { id: string; title: string }>(
  `${todolistsSlice.name}/changeTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistApi.updateTodolist(arg.id, arg.title)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { id: arg.id, title: arg.title }
      } else {
        handleServerAppError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

// export const changeTodolistTitleTC =
//   (id: string, title: string): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: "loading" }))
//     todolistApi
//       .updateTodolist(id, title)
//       .then((res) => {
//         if (res.data.resultCode === ResultCode.success) {
//           dispatch(changeTodolistTitle({ id, title }))
//           dispatch(setAppStatus({ status: "succeeded" }))
//         } else {
//           handleServerAppError(dispatch, res.data)
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(dispatch, error)
//       })
//   }
