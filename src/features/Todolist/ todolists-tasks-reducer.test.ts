import { addTodolist, TodolistDomainType, todolistsReducer } from "features/Todolist/todolistsSlice"
import { tasksReducer } from "features/Todolist/Todolist/Task/tasksSlice"
import { v1 } from "uuid"
import { TasksStateType } from "app/AppWithRedux"
import { ActionTest } from "common/type/types"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action: ActionTest<typeof addTodolist.fulfilled> = {
    type: addTodolist.fulfilled.type,
    payload: {
      todolist: {
        id: v1(),
        title: "newTitle",
        addedDate: "",
        order: 0,
      },
    },
  }

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
