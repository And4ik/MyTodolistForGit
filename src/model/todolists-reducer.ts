
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";


export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type RemoveTodolistActionsType = {
    type: "REMOVE-TODOLIST"
    payload: {
        id: string
    }
}
export type AddTodolistActionsType = {
    type: "ADD-TODOLIST"
    payload: {
        todolist: TodolistType
    }
}
type ChangeTodolistActionsType = {
    type: "CHANGE-TODOLIST-TITLE"
    payload: {
        id: string
        title: string
    }
}
type ChangeTodolistFilterActionsType = {
    type: "CHANGE-TODOLIST-FILTER"
    payload: {
        id: string
        filter: FilterValuesType
    }
}

export type ActionsType =
    | RemoveTodolistActionsType
    | AddTodolistActionsType
    | ChangeTodolistActionsType
    | ChangeTodolistFilterActionsType
    | SetTodolistsActionType

const initialState:Array<TodolistDomainType> = []
export const todolistsReducer = (state = initialState, action:ActionsType):Array<TodolistDomainType> => {
    switch (action.type){
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
            // const stateCopy = { ...state }
            // action.todolists.forEach(tl => {
            //     stateCopy[tl.id] = []
            // })
            // return stateCopy
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl=> tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist:TodolistDomainType = {...action.payload.todolist, filter: "all"}
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map(el=> el.id === action.payload.id ? {...el, title: action.payload.title}  : el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            return state.map(el=> el.id===action.payload.id ? {...el, filter: action.payload.filter}  : el)
        }
        default: return state
    }
}

export const RemoveTodolistAC = (id: string)=> {
    return {type: "REMOVE-TODOLIST", payload:{id}} as const}
export const AddTodolistAC = (todolist: TodolistType)=> {
    return {type: "ADD-TODOLIST", payload: {todolist}} as const}
export const UpdateTodolistAC  = (id: string , title: string)=> {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id, title},} as const}
export const ChangeFilterAC = (id: string , filter: FilterValuesType)=> {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id, filter},} as const}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const getTodolistsTC = (dispatch: Dispatch) => {
    todolistApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const deleteTodolistTC = (todoId: string)=>(dispatch: Dispatch) => {
    todolistApi.deleteTodolist(todoId).then(res => {
        dispatch(RemoveTodolistAC(todoId))
    })
}
export const createTodolistTC = (title: string)=>(dispatch: Dispatch) => {
    todolistApi.createTodolist(title).then(res => {
        dispatch(AddTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (todoId: string,title: string) => (dispatch:Dispatch) => {
    todolistApi.updateTodolist(todoId, title)
        .then((res) => dispatch(UpdateTodolistAC(todoId, title)))
}



