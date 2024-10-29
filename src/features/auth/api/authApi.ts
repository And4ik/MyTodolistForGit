import { instance } from "common/instance/instance"
import { LoginParamsType } from "features/auth/api/authApi.types"
import { BaseResponse } from "common/type/types"

export const authApi = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponse<{ userId: number }>>(`/auth/login`, data)
  },
  me() {
    return instance.get<BaseResponse<UserType>>(`/auth/me`)
  },
  logOut() {
    return instance.delete<BaseResponse>(`/auth/login`)
  },
}

//types

export type UserType = {
  id: number
  email: string
  login: string
}
