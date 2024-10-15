import axios from "axios"

const instanceTask = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "18893e08-0c1d-460c-bd5d-e648cb9d966d",
  },
})

export const taskApi = {
  getTasks(todolistId: string) {
    return instanceTask.get<getTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instanceTask.post<ResponseTaskType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instanceTask.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instanceTask.put<ResponseTaskType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}

//types
export type UpdateTaskModelType = {
  title: string
  status: TaskStatuses
  description: string
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export enum TaskStatuses {
  New = 0, //isDone:false
  InProgress = 1,
  Completed = 2, // isDone:true
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
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
export type ResponseTaskType<D = {}> = {
  data: D
  fieldsErrors: string[]
  resultCode: number
  messages: string[]
}
