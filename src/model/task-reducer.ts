  import {v1} from "uuid";
  import { TasksStateType } from "../AppWithReducers";

  import {AddTodolistActionsType, RemoveTodolistAC, RemoveTodolistActionsType} from "./todolists-reducer";



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

const initialState: TasksStateType = {}
export const tasksReducer = (state = initialState, action:ActionsType) :TasksStateType=> {
    switch (action.type){
        case "REMOVE-TASK": {
            // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t=> t.id !== action.payload.taskId)}
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskId ? {...t, isDone: action.taskStatus}: t) }
        }
        case "CHANGE-TASK-TITLE": {
            return {...state,[action.todolistId]: state[action.todolistId].map(t=> t.id === action.taskId ? {...t, title: action.title}: t) }
        }
        case "ADD-TODOLIST":{
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE-TODOLIST":{
            // let copyState = {...state}
            // delete copyState[action.payload.id]
            // return copyState
            const {[action.payload.id]: [], ...rest} = state
            return rest
        }

        default: return state
    }

}
  export const RemoveTaskAC = (taskId: string, todolistId:string)=> {
      return {
          type: "REMOVE-TASK",
          payload:{
              taskId,
              todolistId
          }
      } as const
  }
  export const AddTaskAC = (title:string, todolistId:string)=> {
      return {type: "ADD-TASK",todolistId,title } as const
  }
  export const ChangeTaskStatusAC = (taskId:string, taskStatus: boolean, todolistId:string)=> {
      return {type: "CHANGE-TASK-STATUS",todolistId,taskId,taskStatus } as const
  }
  export const ChangeTaskTitleAC = (todolistId:string, taskId: string, title: string)=> {
      return {type: "CHANGE-TASK-TITLE",todolistId,taskId,title } as const
  }
// export const firstAC = (id: string)=> {
//     return {
//         type: "",
// }
// export const secondAC = (title: string)=> {
//     return {
//         type: "",
//     } as const
// }

