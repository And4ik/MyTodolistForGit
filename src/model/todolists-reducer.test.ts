import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistsReducer, updateTodolistAC
} from "./todolists-reducer";

test( "correct todolist should be removed",()=> {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    // const action = {
    //     type: "REMOVE-TODOLIST",
    //     payload:{
    //         id:todolistID1
    //     }
    // } as const
    // const endState = todolistsReducer(startState, action)
    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
})

test( "correct todolist should be added",()=> {

    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState:TodolistType[] = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]
    // const action = {
    //     type: "ADD-TODOLIST",
    //     payload:{
    //         title:"New Todolist"
    //     },
    // } as const
    //
    // const endState = todolistsReducer(startState, action)
    const endState = todolistsReducer(startState, addTodolistAC("New Todolist"))
    expect(endState.length).toBe(3)
    // expect(endState[2].title).toBe(action.payload.title)
    expect(endState[2].title).toBe("New Todolist")
})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: 'New Todolist',
    //     },
    // } as const
    // const endState = todolistsReducer(startState, action)
    const endState = todolistsReducer(startState, updateTodolistAC(todolistId2,'New Todolist'))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe('New Todolist')
})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER',
    //     payload: {
    //         id: todolistId2,
    //         filter: 'completed',
    //     },
    // } as const
    const endState = todolistsReducer(startState, changeFilterAC(todolistId2,'completed'))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})