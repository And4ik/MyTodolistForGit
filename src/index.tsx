import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import AppWithRedux from "./app/AppWithRedux"
import { store } from "./app/store"
import { Provider } from "react-redux"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { Login } from "./features/Login/Login"

import { ErrorPage } from "./Components/ErrorPage/ErrorPage"
import { TodolistsList } from "./features/Todolist/TodolistList"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithRedux />,
    errorElement: <Navigate to={"/error404"} />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/todolists",
        element: <TodolistsList />,
      },
      {
        index: true,
        element: <Navigate to="/todolists" />,
      },
    ],
  },
  {
    path: "/error404",
    element: <ErrorPage />,
  },
])

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
