import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";


type RemoveTodolistActionsType = {
    type: "REMOVE-TODOLIST"
    payload: {
        id: string
    }
}
type AddTodolistActionsType = {
    type: "ADD-TODOLIST"
    payload: {
        title: string
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

type ActionsType =
    | RemoveTodolistActionsType
    | AddTodolistActionsType
    | ChangeTodolistActionsType
    | ChangeTodolistFilterActionsType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState:TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action:ActionsType) :TodolistType[]=> {
    switch (action.type){
        case "REMOVE-TODOLIST": {
            // setTodolists(todolists.filter(t => t.id !== todolistId))
            return state.filter(tl=> tl.id !==  action.payload.id)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}
            return ([...state,newTodolist])
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

export const removeTodolistAC = (id: string)=> {
    return {
        type: "REMOVE-TODOLIST",
        payload:{
            id
        }
    } as const
}
export const addTodolistAC = (title: string)=> {
    return {
        type: "ADD-TODOLIST",
        payload:{
            title
        },
    } as const
}
export const updateTodolistAC = (id: string ,title: string)=> {
    return {
            type: 'CHANGE-TODOLIST-TITLE',
            payload: {
                id,
                title
            },
        } as const
}
export const changeFilterAC = (id: string ,filter: FilterValuesType)=> {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        },
    } as const
}

