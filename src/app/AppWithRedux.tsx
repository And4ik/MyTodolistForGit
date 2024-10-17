import React, { useEffect, useState } from "react"
import "./App.css"
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import Box from "@mui/material/Box"
import { AppBarHeader } from "trash/AppBarHeader"
import { TaskType } from "api/task-api"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppDispatch } from "./store"
import { ErrorSnackbar } from "Components/ErrorSnackbar/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import { meTC } from "features/Login/authSlice"
import CircularProgress from "@mui/material/CircularProgress"
import { useSelector } from "react-redux"
import { selectIsInitialized, selectStatus } from "app/appSlice"

export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {
  type ThemeMod = "dark" | "light"
  const [themeMode, setThemeMode] = useState<ThemeMod>("light")
  const changeModeHandler = () => {
    setThemeMode(themeMode === "light" ? "dark" : "light")
  }

  const status = useSelector(selectStatus)
  const isInitialized = useSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }
  const theme = createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: {
        main: "#9f581d",
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
        <ErrorSnackbar />
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarHeader changeModeHandler={changeModeHandler} />
        </Box>
        {status === "loading" && <LinearProgress color={"success"} />}
        <Container fixed>
          <Outlet />
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default AppWithRedux
