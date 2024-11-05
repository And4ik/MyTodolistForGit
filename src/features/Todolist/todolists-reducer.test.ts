import { v1 } from "uuid"

import {
  addTodolist,
  ChangeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
  TodolistDomainType,
  todolistsReducer,
} from "features/Todolist/todolistsSlice"
import { ActionTest } from "common/type/types"

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
  const action: ActionTest<typeof removeTodolist.fulfilled> = {
    type: removeTodolist.fulfilled.type,
    payload: {
      id: todolistID1,
    },
  }

  const endState = todolistsReducer(startState, action)
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})
test("correct todolist should be added", () => {
  const action: ActionTest<typeof addTodolist.fulfilled> = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: v1(),
        title: "New Todolist",
        addedDate: "",
        order: 0,
      },
    },
  }
  const endState = todolistsReducer(startState, action)
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
  const action: ActionTest<typeof changeTodolistTitle.fulfilled> = {
    type: changeTodolistTitle.fulfilled.type,
    payload: {
      id: todolistID2,
      title: "New Todolist",
    },
  }
  const endState = todolistsReducer(startState, action)

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
  const endState = todolistsReducer(startState, ChangeTodolistFilter({ id: todolistID2, filter: "completed" }))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe("completed")
})
