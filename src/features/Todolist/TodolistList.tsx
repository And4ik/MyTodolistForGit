import React, { useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "common/hooks/useAppDispatch"
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
  createTask,
  removeTask,
  selectTasks,
  updateTaskStatus,
  updateTaskTitle,
} from "features/Todolist/Todolist/Task/tasksSlice"

import { Grid } from "@mui/material"
import { AddItemForm } from "common/components/AdditemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "features/auth/model/authSlice"
import { TaskStatuses } from "features/Todolist/lib/enums/enums"

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

  const removeTaskCallback = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(removeTask({ todolistId, taskId }))
    },
    [dispatch],
  )

  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(createTask({ todolistId, title }))
    },
    [dispatch],
  )

  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskStatus({ todolistId, taskId, status }))
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
    (todolistId: string, taskId: string, title: string) => {
      dispatch(updateTaskTitle({ todolistId, taskId, title }))
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
                  removeTask={removeTaskCallback}
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
