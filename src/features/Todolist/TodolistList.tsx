import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "app/store"
import {
  ChangeTodolistFilter,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  FilterValuesType,
  getTodolistsTC,
  selectTodolists,
} from "features/Todolist/todolistsSlice"
import {
  createTaskTC,
  removeTaskTC,
  selectTasks,
  updateTaskStatusTC,
  updateTaskTitleTC,
} from "features/Todolist/tasksSlice"
import { TaskStatuses } from "api/task-api"
import { Grid } from "@mui/material"
import { AddItemForm } from "Components/AdditemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "features/Login/authSlice"

export const TodolistsList: React.FC = () => {
  let todolists = useSelector(selectTodolists)
  let tasks = useSelector(selectTasks)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const changeFilter = useCallback(
    (id: string, filter: FilterValuesType) => {
      dispatch(ChangeTodolistFilter({ id, filter }))
    },
    [dispatch],
  )

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(removeTaskTC(todolistId, taskId))
    },
    [dispatch],
  )

  const addTask = useCallback(
    (todolistId: string, value: string) => {
      dispatch(createTaskTC(todolistId, value))
    },
    [dispatch],
  )

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskStatusTC(todolistId, taskId, status))
    },
    [dispatch],
  )

  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(deleteTodolistTC(todolistId))
    },
    [dispatch],
  )

  const addTodolist = useCallback(
    (newTitle: string) => {
      dispatch(createTodolistTC(newTitle))
    },
    [dispatch],
  )

  const changeTaskTitle = useCallback(
    (todolistId: string, taskID: string, newTitle: string) => {
      dispatch(updateTaskTitleTC(todolistId, taskID, newTitle))
    },
    [dispatch],
  )

  const changeTodolistTitle = useCallback(
    (todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle))
    },
    [dispatch],
  )

  useEffect(() => {
    dispatch(getTodolistsTC)
  }, [dispatch])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid container sx={{ padding: "15px" }}>
        <AddItemForm onClick={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Paper elevation={6} sx={{ padding: "15px" }}>
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  tasks={tasks[tl.id]}
                  title={tl.title}
                  changeFilter={changeFilter}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTodolistTitle={changeTodolistTitle}
                  filter={tl.filter}
                  changeTaskTitle={changeTaskTitle}
                  entityStatus={tl.entityStatus}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
