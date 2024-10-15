import React, { useState } from "react"
import "../app/App.css"
import { Todolist } from "../features/Todolist/Todolist/Todolist"
import { v1 } from "uuid"
import { AddItemForm } from "../Components/AdditemForm/AddItemForm"
import { Container, createTheme, CssBaseline, Grid, ThemeProvider } from "@mui/material"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { AppBarHeader } from "./AppBarHeader"
import { TaskPriorities, TaskStatuses, TaskType } from "../api/task-api"
import { FilterValuesType, TodolistDomainType } from "../features/Todolist/todolists-reducer"
import { RequestStatusType } from "app/appSlice"

export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistDomainType[]>([
    { id: todolistID1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistID2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        todoListId: todolistID1,
        order: 0,
        addedDate: "",
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        deadline: "",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: todolistID1,
        order: 0,
        addedDate: "",
        priority: TaskPriorities.Later,
        description: "",
        startDate: "",
        deadline: "",
      },
      {
        id: v1(),
        title: "ReactJS",
        status: TaskStatuses.New,
        todoListId: todolistID1,
        order: 0,
        addedDate: "",
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        deadline: "",
      },
    ],
    [todolistID2]: [
      {
        id: v1(),
        title: "Rest API",
        status: TaskStatuses.Completed,
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
        priority: TaskPriorities.Hi,
        description: "",
        startDate: "",
        deadline: "",
      },
      {
        id: v1(),
        title: "GraphQL",
        status: TaskStatuses.New,
        todoListId: todolistID2,
        order: 0,
        addedDate: "",
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        deadline: "",
      },
    ],
  })

  function changeFilter(todolistId: string, filter: FilterValuesType) {
    setTodolists(todolists.map((tl) => (tl.id === todolistId ? { ...tl, filter: filter } : tl)))
  }

  function removeTask(todolistId: string, taskId: string) {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
  }

  function addTask(todolistId: string, value: string) {
    let newTask = {
      id: v1(),
      title: value,
      status: TaskStatuses.New,
      todoListId: todolistId,
      order: 0,
      addedDate: "",
      priority: TaskPriorities.Low,
      description: "",
      startDate: "",
      deadline: "",
    }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  function changeTaskStatus(todolistId: string, taskId: string, status: TaskStatuses) {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map((t) => (t.id === taskId ? { ...t, status: status } : t)) })
  }

  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter((t) => t.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  function addTodolist(newTitle: string) {
    const newID = v1()
    const newTodolist: TodolistDomainType = {
      id: newID,
      title: newTitle,
      filter: "all",
      addedDate: "",
      order: 0,
      entityStatus: "idle",
    }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [newID]: [] })
  }

  const changeTaskTitle = (todolistId: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map((t) => (t.id === taskID ? { ...t, title: newTitle } : t)),
    })
  }
  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    setTodolists(todolists.map((el) => (el.id === todolistId ? { ...el, title: newTitle } : el)))
  }
  type ThemeMode = "dark" | "light"
  const [themeMode, setThemeMode] = useState<ThemeMode>("light")
  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light")
  }
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#24be1d",
        contrastText: "white",
      },
      secondary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
    },
  })
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarHeader changeModeHandler={changeModeHandler} />
        </Box>
        <Container fixed>
          <Grid container sx={{ padding: "15px" }}>
            <AddItemForm onClick={addTodolist} />
          </Grid>
          <Grid container spacing={4}>
            {todolists.map((tl) => {
              let tasksForTodolist = tasks[tl.id]
              if (tl.filter === "active") {
                tasksForTodolist = tasks[tl.id].filter((t) => t.status === TaskStatuses.New)
              }
              if (tl.filter === "completed") {
                tasksForTodolist = tasks[tl.id].filter((t) => t.status === TaskStatuses.Completed)
              }
              return (
                <Grid item>
                  <Paper elevation={6} sx={{ padding: "15px" }}>
                    <Todolist
                      key={tl.id}
                      todolistId={tl.id}
                      tasks={tasksForTodolist}
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
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App
