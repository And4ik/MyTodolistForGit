import { instance } from "common/instance/instance"
import { BaseResponse } from "common/type/types"

export const todolistApi = {
  getTodolists() {
    return instance.get<TodolistType[]>(`/todo-lists`)
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>>(`/todo-lists`, { title })
  },
  deleteTodolist(todoID: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todoID}`)
  },
  updateTodolist(todoID: string, title: string) {
    return instance.put<BaseResponse>(`/todo-lists/${todoID}`, { title })
  },
}

//types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
