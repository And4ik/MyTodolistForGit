import { taskApi, TaskStatuses, TaskType, UpdateTaskModelType } from "api/task-api"
import { AppThunk } from "app/store"
import { setAppError, setAppStatus } from "app/appSlice"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AddTodolist, ClearTodosData, RemoveTodolist } from "features/Todolist/todolistsSlice"
import { TasksStateType } from "app/AppWithRedux"

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  reducers: {
    RemoveTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
      //return { ...state, [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId) }
    },
    AddTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
      //return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
    },
    ChangeTaskStatus: (state, action: PayloadAction<{ taskId: string; status: TaskStatuses; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index].status = action.payload.status
      }
    },
    ChangeTaskTitle: (state, action: PayloadAction<{ todolistId: string; taskId: string; title: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((t) => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index].title = action.payload.title
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(RemoveTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(ClearTodosData, (state) => {
        Object.keys(state).forEach((key) => delete state[key])
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { AddTask, setTasks, ChangeTaskTitle, ChangeTaskStatus, RemoveTask } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
//thunks
export const getTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    taskApi.getTasks(todolistId).then((res) => {
      dispatch(setTasks({ tasks: res.data.items, todolistId }))
      dispatch(setAppStatus({ status: "succeeded" }))
    })
  }

export const removeTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    taskApi.deleteTask(todolistId, taskId).then(() => {
      dispatch(RemoveTask({ taskId, todolistId }))
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
          dispatch(AddTask({ task: res.data.data.item }))
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
            dispatch(ChangeTaskStatus({ taskId, status, todolistId: todoId }))
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
            dispatch(ChangeTaskTitle({ todolistId: todoId, taskId, title }))
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
