import axios  from "axios";
const instanceTodolist = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",

    withCredentials: true,
    headers: {
        "API-KEY": "18893e08-0c1d-460c-bd5d-e648cb9d966d"
    }
})


export const todolistApi = {
    getTodolists() {
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

//types
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type ResponseTodolistType<T= {}> = {
    data: T ,
    fieldsErrors: string[],
    resultCode: number
    messages: string[],
}
