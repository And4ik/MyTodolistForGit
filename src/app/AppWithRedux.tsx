import React, {useState} from 'react';
import './App.css';
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Box from "@mui/material/Box";
import {AppBarHeader} from "../trash/AppBarHeader";
import {TaskType} from "../api/task-api";
import {TodolistsList} from "../features/Todolist/TodolistList";
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackbar/ErrorSnackbar";

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    type ThemeMod = "dark" | "light"
    const [themeMode, setThemeMode] = useState<ThemeMod>("light")
    const changeModeHandler = ()=> {
        setThemeMode(themeMode === "light" ? "dark": "light")
    }
    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light": "dark",
            primary: {
                main: '#9f581d',
                contrastText: 'white',
            },
            secondary: {
                light: '#757ce8',
                main: '#3f50b5',
                dark: '#002884',
                contrastText: '#fff',
            },
        },
    })
    return (
        <div>
            <ThemeProvider theme={theme}>

                <ErrorSnackbar/>
                <CssBaseline/>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBarHeader changeModeHandler={changeModeHandler}/>
                </Box>
                {
                    status === "loading" && <LinearProgress color={"success"}/>
                }
                <Container fixed>
                    <TodolistsList />
                </Container>


            </ThemeProvider>

        </div>
    );
}


export default AppWithRedux;
