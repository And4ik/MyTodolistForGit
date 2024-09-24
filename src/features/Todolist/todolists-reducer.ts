import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType} from "../../app/store";
import {RequestStatusType,setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";



export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}


const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todoId ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

//actions
export const RemoveTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const AddTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const UpdateTodolistAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const ChangeFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const changeTodolistEntityStatusAC = (todoId: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', todoId, status,}) as const

//thunks
export const getTodolistsTC = (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    })
}

export const deleteTodolistTC = (todoId: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoId, "loading"))
    todolistApi.deleteTodolist(todoId).then(res => {
        dispatch(RemoveTodolistAC(todoId))
        dispatch(setAppStatusAC('succeeded'))
    })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
            handleServerNetworkError(dispatch, error)
        })
}
export const changeTodolistTitleTC = (todoId: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.updateTodolist(todoId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(UpdateTodolistAC(todoId, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(error => {
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

export type RemoveTodolistActionsType = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistActionsType = {
    type: "ADD-TODOLIST"
    todolist: TodolistType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

