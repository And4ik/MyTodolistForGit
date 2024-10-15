import axios from "axios"
import { LoginFormType } from "../features/Login/Login"
const instanceAuth = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "18893e08-0c1d-460c-bd5d-e648cb9d966d",
  },
})

export const authApi = {
  login(data: LoginFormType) {
    return instanceAuth.post<ResponseAuthType<{ userId: number }>>(`/auth/login`, data)
  },
  me() {
    return instanceAuth.get<ResponseAuthType<UserType>>(`/auth/me`)
  },
  logOut() {
    return instanceAuth.delete<ResponseAuthType>(`/auth/login`)
  },
}

//types
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseAuthType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
  fieldsErrors: string[]
}

export type UserType = {
  id: number
  email: string
  login: string
}
