import {todolistApi, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";


export type FilterValuesType = "all" | "active" | "completed"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: "all"}, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.id ? {...el, title: action.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.id ? {...el, filter: action.filter} : el)
        default:
            return state
    }
}

//actions
export const RemoveTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const AddTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const UpdateTodolistAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const ChangeFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunks
export const getTodolistsTC = (dispatch: Dispatch<ActionsType>) => {
    todolistApi.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
    })
}

export const deleteTodolistTC = (todoId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.deleteTodolist(todoId).then(res => {
        dispatch(RemoveTodolistAC(todoId))
    })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.createTodolist(title).then(res => {
        dispatch(AddTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (todoId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistApi.updateTodolist(todoId, title)
        .then((res) => dispatch(UpdateTodolistAC(todoId, title)))
}

//types
export type ActionsType =
    | SetTodolistsActionType
    | AddTodolistActionsType
    | RemoveTodolistActionsType
    | ReturnType<typeof UpdateTodolistAC>
    | ReturnType<typeof ChangeFilterAC>

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

