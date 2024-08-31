import axios from "axios";

const instanceTask = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "48a6b150-1e1e-4fb8-82c1-cdf0881e26ed"
    }
})

export enum TaskStatuses {
    New = 0, //isDone:false
    InProgress = 1,
    Completed = 2, // isDone:true
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
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
