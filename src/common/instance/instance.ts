import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1",
  withCredentials: true,
  headers: {
    "API-KEY": "18893e08-0c1d-460c-bd5d-e648cb9d966d",
  },
})
