import {
  AddTaskArgs,
  removeTaskArgs,
  taskApi,
  TaskType,
  UpdateTaskModelType,
  UpdateTaskStatusArgs,
  UpdateTaskTitleArgs,
} from "features/Todolist/Todolist/Task/api/task-api"
import { setAppStatus } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, clearTasksAndTodolists, fetchTodolists, removeTodolist } from "features/Todolist/todolistsSlice"
import { TasksStateType } from "app/AppWithRedux"
import { CreateAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    // RemoveTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
    //   const tasks = state[action.payload.todolistId]
    //   const index = tasks.findIndex((t) => t.id === action.payload.taskId)
    //   if (index !== -1) {
    //     tasks.splice(index, 1)
    //   }
    //return { ...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId) }
    // },
    // ChangeTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatuses; todolistId: string }>) => {
    //   const tasks = state[action.payload.todolistId]
    //   const index = tasks.findIndex((t) => t.id === action.payload.taskId)
    //   if (index !== -1) {
    //     tasks[index].status = action.payload.status
    //   }
    // },
    // ChangeTaskTitle: (state, action: PayloadAction<{ todolistId: string; taskId: string; title: string }>) => {
    //   const tasks = state[action.payload.todolistId]
    //   const index = tasks.findIndex((t) => t.id === action.payload.taskId)
    //   if (index !== -1) {
    //     tasks[index].title = action.payload.title
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index].status = action.payload.status
        }
      })
      .addCase(updateTaskTitle.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((t) => t.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index].title = action.payload.title
        }
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearTasksAndTodolists, () => {
        return {}
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors
//thunks

export const removeTask = CreateAppAsyncThunk<removeTaskArgs, removeTaskArgs>(
  `${tasksSlice.name}`,
  async ({ todolistId, taskId }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await taskApi.deleteTask(todolistId, taskId)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { taskId, todolistId }
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
//
// export const removeTaskTC =
//   (todolistId: string, taskId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: "loading" }))
//     taskApi.deleteTask(todolistId, taskId).then(() => {
//       dispatch(RemoveTask({ taskId, todolistId }))
//       dispatch(setAppStatus({ status: "succeeded" }))
//     })
//   }

export const fetchTasks = CreateAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${tasksSlice.name}/fetchTasks`,
  async (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await taskApi.fetchTasks(todolistId)
      dispatch(setAppStatus({ status: "succeeded" }))
      return { tasks: res.data.items, todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

// export const fetchTasksTC =
//   (todolistId: string): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: "loading" }))
//     taskApi.fetchTasks(todolistId).then((res) => {
//       dispatch(setTasks({ tasks: res.data.items, todolistId }))
//       dispatch(setAppStatus({ status: "succeeded" }))
//     })
//   }

export const addTask = CreateAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(
  `${tasksSlice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await taskApi.addTask(arg)

      if (res.data.resultCode === ResultCode.success) {
        const task = res.data.data.item
        dispatch(setAppStatus({ status: "succeeded" }))
        return { task }
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

// export const addTaskTC =
//   (todolistId: string, title: string): AppThunk =>
//   (dispatch) => {
//     dispatch(setAppStatus({ status: "loading" }))
//     taskApi
//       .addTask(todolistId, title)
//       .then((res) => {
//         if (res.data.resultCode === 0) {
//           dispatch(AddTask({ task: res.data.data.item }))
//           dispatch(setAppStatus({ status: "succeeded" }))
//         } else {
//           dispatch(setAppError({ error: res.data.messages.length ? res.data.messages[0] : "Some error occurred" }))
//           dispatch(setAppStatus({ status: "failed" }))
//         }
//       })
//       .catch((error) => {
//         handleServerNetworkError(dispatch, error)
//       })
//   }

export const updateTaskStatus = CreateAppAsyncThunk<UpdateTaskStatusArgs, UpdateTaskStatusArgs>(
  `${tasksSlice.name}/updateTaskStatus`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      const state = getState()
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
      if (!task) {
        console.warn("task not found in the state")
        return rejectWithValue(null)
      }
      const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: arg.status,
      }
      dispatch(setAppStatus({ status: "loading" }))
      const res = await taskApi.updateTask(arg.todolistId, arg.taskId, model)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return arg
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

// export const updateTaskStatusTC =
//   (todoId: string, taskId: string, status: TaskStatuses): AppThunk =>
//   (dispatch, getState) => {
//     const state = getState()
//     const task = state.tasks[todoId].find((t) => t.id === taskId)
//     if (task) {
//       const model: UpdateTaskModelType = {
//         title: task.title,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         deadline: task.deadline,
//         status: status,
//       }
//       dispatch(setAppStatus({ status: "loading" }))
//       taskApi
//         .updateTask(todoId, taskId, model)
//         .then((res) => {
//           if (res.data.resultCode === 0) {
//             dispatch(ChangeTaskStatus({ taskId, status, todolistId: todoId }))
//             dispatch(setAppStatus({ status: "succeeded" }))
//           } else {
//             handleServerAppError(dispatch, res.data)
//           }
//         })
//         .catch((error) => {
//           handleServerNetworkError(dispatch, error)
//         })
//     }
//   }

export const updateTaskTitle = CreateAppAsyncThunk<UpdateTaskTitleArgs, UpdateTaskTitleArgs>(
  `${tasksSlice.name}/updateTaskTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      const state = getState()
      const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId)
      if (!task) {
        console.warn("task not found in the state")
        return rejectWithValue(null)
      }
      const model: UpdateTaskModelType = {
        title: arg.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
      }
      dispatch(setAppStatus({ status: "loading" }))
      const res = await taskApi.updateTask(arg.todolistId, arg.taskId, model)
      if (res.data.resultCode === ResultCode.success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { todolistId: arg.todolistId, title: arg.title, taskId: arg.taskId }
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

// export const updateTaskTitleTC =
//   (todoId: string, taskId: string, title: string): AppThunk =>
//   (dispatch, getState) => {
//     const state = getState()
//     const task = state.tasks[todoId].find((t) => t.id === taskId)
//     if (task) {
//       const model: UpdateTaskModelType = {
//         title,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         deadline: task.deadline,
//         status: task.status,
//       }
//       dispatch(setAppStatus({ status: "loading" }))
//       taskApi
//         .updateTask(todoId, taskId, model)
//         .then((res) => {
//           if (res.data.resultCode === 0) {
//             dispatch(ChangeTaskTitle({ todolistId: todoId, taskId, title }))
//             dispatch(setAppStatus({ status: "succeeded" }))
//           } else {
//             handleServerAppError(dispatch, res.data)
//           }
//         })
//         .catch((error) => {
//           handleServerNetworkError(dispatch, error)
//         })
//     }
//   }
