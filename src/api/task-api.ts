import axios from "axios";

const instanceTask = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "48a6b150-1e1e-4fb8-82c1-cdf0881e26ed"
    }
})
export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponse = {
    items: TaskType [],
    totalCount: number
    error: string | null
}

type ResponseTaskType<D= {}> = {
    data: D ,
    fieldsErrors: string[],
    resultCode: number
    messages: string[],
}
export const taskApi = {
    getTask(todolistId: string) {
        return instanceTask.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instanceTask.post<ResponseTaskType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instanceTask.delete<ResponseTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string,title: string) {
        return instanceTask.put<ResponseTaskType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}
