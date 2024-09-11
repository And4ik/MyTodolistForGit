import {TasksStateType} from "../App";
import {AddTodolistActionsType, RemoveTodolistActionsType, SetTodolistsActionType} from "./todolists-reducer";
import {taskApi,TaskStatuses, TaskType, UpdateTaskModelType} from "../api/task-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";


type RemoveTaskActionsType = {
    type: "REMOVE-TASK"
    payload: {
        taskId: string
        todolistId:string
    }
}
type AddTaskActionsType = ReturnType<typeof AddTaskAC>
type ChangeTaskStatusActionsType = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleActionsType = ReturnType<typeof ChangeTaskTitleAC>
type ActionsType =
    | RemoveTaskActionsType
    | AddTaskActionsType
    | ChangeTaskStatusActionsType
    | ChangeTaskTitleActionsType
    | AddTodolistActionsType
    | RemoveTodolistActionsType
    | SetTodolistsActionType
    | SetTasksActionType


const initialState:TasksStateType = {}
export const tasksReducer = (state = initialState, action:ActionsType) :TasksStateType=> {

    switch (action.type){
        case 'SET-TODOLISTS': {
            const stateCopy = { ...state }
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "REMOVE-TASK": {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t=> t.id !== action.payload.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        }
        case "CHANGE-TASK-STATUS": {
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskId ? {...t, status: action.status}: t) }
        }
        case "CHANGE-TASK-TITLE": {
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskId ? {...t, title: action.title}: t) }
        }
        case "ADD-TODOLIST":{
            return {...state, [action.payload.todolist.id]: []}
        }
        case "REMOVE-TODOLIST":{
            const {[action.payload.id]: [], ...rest} = state
            return rest
        }
        default: return state
    }

}
  export const RemoveTaskAC = (taskId: string, todolistId:string)=> {
      return {type: "REMOVE-TASK", payload:{taskId, todolistId}} as const
  }
  export const AddTaskAC = (task: TaskType)=> {
      return {type: "ADD-TASK", task } as const
  }
  export const ChangeTaskStatusAC = (taskId:string, status: TaskStatuses, todolistId:string)=> {
      return {type: "CHANGE-TASK-STATUS",todolistId,taskId,status } as const
  }
  export const ChangeTaskTitleAC = (todolistId:string, taskId: string, title: string)=> {
      return {type: "CHANGE-TASK-TITLE",todolistId,taskId,title } as const
  }
  export const setTasksAC = (tasks:Array<TaskType>, todolistId: string): SetTasksActionType=> {
      return {type: "SET-TASKS",tasks,todolistId}
  }

  type SetTasksActionType = {
      type: 'SET-TASKS'
      tasks: Array<TaskType>
      todolistId: string
  }

  export const getTasksTC = (todolistId: string)  => (dispatch: Dispatch) => {
      taskApi.getTasks(todolistId)
          .then(res => dispatch(setTasksAC(res.data.items, todolistId)))
  }
  export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
      taskApi.deleteTask(todolistId,taskId)
          .then(res => dispatch(RemoveTaskAC(taskId, todolistId)))
  }

  export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
      taskApi.createTask(todolistId,title)
          .then(res => dispatch(AddTaskAC(res.data.data.item)))
  }




export const updateTaskStatusTC = (todoId: string,taskId: string, status: TaskStatuses) => (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todoId].find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task.title,
            description:  task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: status,
        }
        taskApi.updateTask(todoId, taskId, model)
            .then(() => dispatch(ChangeTaskStatusAC(taskId,status,todoId)))
    }
}
//------------------------------------
export const updateTaskTitleTC = (todoId: string,taskId: string, title: string) => (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todoId].find(t => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            title,
            description:  task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
        }
        taskApi.updateTask(todoId, taskId, model)
            .then(() => dispatch(ChangeTaskTitleAC(todoId,taskId,title)))
    }

}