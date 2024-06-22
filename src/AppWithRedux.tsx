import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
// import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {Container, createTheme, CssBaseline, Grid, ThemeProvider} from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import {AppBarHeader} from "./Components/AppBarHeader";
import {AddTodolistAC, ChangeFilterAC, RemoveTodolistAC, UpdateTodolistAC,} from "./model/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./model/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model/store";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed"

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TasksType[]
}

function AppWithRedux() {
    //
    // let todolistID1 = v1()
    // let todolistID2 = v1()

    let todolists = useSelector<AppRootStateType,TodolistType[]>(state => state.todolists)

    // let tasks= useSelector<AppRootStateType,TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        dispatch(ChangeFilterAC(todolistId,filter))
    }
    function removeTask(todolistId: string, taskId: string) {
        dispatch(RemoveTaskAC(taskId, todolistId))
    }
    function addTask(todolistId: string, value: string) {
        dispatch(AddTaskAC(todolistId, value))
        dispatch(AddTaskAC(todolistId, value))
    }
    function changeTaskStatus(todolistId: string, taskId: string, taskStatus: boolean) {
        dispatch(ChangeTaskStatusAC(taskId, taskStatus, todolistId))
    }
    function removeTodolist(todolistId: string) {
        dispatch(RemoveTodolistAC(todolistId))
    }
    function addTodolist(newTitle: string) {
        dispatch(AddTodolistAC(newTitle))
    }

    const updateTask = (todolistId: string, taskID: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskID, newTitle))
    }
    const updateTodolist = (todolistId: string, newTitle: string) => {
        dispatch(UpdateTodolistAC(todolistId,newTitle))
    }

    type ThemeMode = "dark" | "light"
    const [themeMode, setThemeMode] = useState<ThemeMode>("light")
    const changeModeHandler = ()=> {
        setThemeMode(themeMode === "light" ? "dark": "light")
    }
    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light": "dark",
            primary: {
                main: '#24be1d',
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
                <CssBaseline/>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBarHeader changeModeHandler={changeModeHandler}/>
                </Box>
                <Container fixed>
                    <Grid container sx={{padding: "15px"}}>
                        <AddItemForm onClick={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolists.map((tl) => {
                            // let tasksForTodolist = tasks[tl.id]
                            // if (tl.filter === "active") {
                            //     tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                            // }
                            return <Grid key={tl.id} item>
                                <Paper elevation={6} sx={{padding: "15px"}}>
                                    <TodolistWithRedux todolist={tl}/>
                                </Paper>
                            </Grid>
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>

        </div>
    );
}
export default AppWithRedux;
