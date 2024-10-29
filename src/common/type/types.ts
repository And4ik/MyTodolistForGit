export type ActionTest<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">
export type BaseResponse<D = {}> = {
  data: D
  fieldsErrors: string[]
  resultCode: number
  messages: string[]
}
