import { v1 } from "uuid"

import {
  AddTodolistAC,
  ChangeFilterAC,
  RemoveTodolistAC,
  TodolistDomainType,
  todolistsReducer,
  UpdateTodolistAC,
} from "./todolists-reducer"

let todolistID1: string
let todolistID2: string
let startState: TodolistDomainType[]
beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()

  startState = [
    { id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  // const action = {
  //     type: "REMOVE-TODOLIST",
  //     payload:{
  //         id:todolistID1
  //     }
  // } as const
  // const endState = todolistsReducer(startState, action)
  const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID1))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})
test("correct todolist should be added", () => {
  const endState = todolistsReducer(
    startState,
    AddTodolistAC({
      id: v1(),
      title: "New Todolist",
      addedDate: "",
      order: 0,
    }),
  )
  expect(endState.length).toBe(3)
  // expect(endState[2].title).toBe(action.payload.title)
  expect(endState[2].title).toBe("What to buy")
})
test("correct todolist should change its name", () => {
  // const action = {
  //     type: 'CHANGE-TODOLIST-TITLE',
  //     payload: {
  //         id: todolistId2,
  //         title: 'New Todolist',
  //     },
  // } as const
  // const endState = todolistsReducer(startState, action)
  const endState = todolistsReducer(startState, UpdateTodolistAC(todolistID2, "New Todolist"))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New Todolist")
})
test("correct filter of todolist should be changed", () => {
  // const action = {
  //     type: 'CHANGE-TODOLIST-FILTER',
  //     payload: {
  //         id: todolistId2,
  //         filter: 'completed',
  //     },
  // } as const
  const endState = todolistsReducer(startState, ChangeFilterAC(todolistID2, "completed"))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})
