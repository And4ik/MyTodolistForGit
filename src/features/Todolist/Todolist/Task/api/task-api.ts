import { instance } from "common/instance/instance"
import { BaseResponse } from "common/type/types"
import { TaskPriorities, TaskStatuses } from "features/Todolist/lib/enums/enums"
import { removeTask } from "features/Todolist/Todolist/Task/tasksSlice"

export const taskApi = {
  getTasks(todolistId: string) {
    return instance.get<getTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(arg: AddTaskArgs) {
    const { todolistId, title } = arg
    return instance.post<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

//types
export type AddTaskArgs = { title: string; todolistId: string }
export type UpdateTaskStatusArgs = { todolistId: string; taskId: string; status: TaskStatuses }
export type UpdateTaskTitleArgs = { todolistId: string; taskId: string; title: string }
export type removeTaskArgs = { todolistId: string; taskId: string }
export type UpdateTaskModelType = {
  title: string
  status: TaskStatuses
  description: string
  priority: TaskPriorities
  startDate: string
  deadline: string
}

export type TaskType = {
  id: string
  title: string
  status: TaskStatuses
  todoListId: string
  description: string
  priority: TaskPriorities
  startDate: string
  deadline: string
  order: number
  addedDate: string
}
type getTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string | null
}
