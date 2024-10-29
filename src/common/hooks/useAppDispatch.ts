import { useDispatch } from "react-redux"
import { AppDispatch } from "app/store"

//универсальный тиипизированный хук useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
