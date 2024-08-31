import axios  from "axios";
const instanceTodolist = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        "API-KEY": "48a6b150-1e1e-4fb8-82c1-cdf0881e26ed"
    }
})
export type TodolistType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

type ResponseTodolistType<T= {}> = {
    data: T ,
    fieldsErrors: string[],
    resultCode: number
    messages: string[],
}

export const todolistApi = {
    getTodolist() {
        return instanceTodolist.get<TodolistType[]>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instanceTodolist.post<ResponseTodolistType< {item: TodolistType}>>(`/todo-lists`, {title})
    },
    deleteTodolist(todoID: string) {
        return instanceTodolist.delete<ResponseTodolistType>(`/todo-lists/${todoID}`)
    },
    updateTodolist(todoID: string, title: string) {
        return instanceTodolist.put<ResponseTodolistType>(`/todo-lists/${todoID}`, {title})
    },

}
