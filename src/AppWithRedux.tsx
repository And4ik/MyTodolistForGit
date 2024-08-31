import React, {useCallback, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./Components/AddItemForm";
import {Container, createTheme, CssBaseline, Grid, ThemeProvider} from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import {AppBarHeader} from "./Components/AppBarHeader";
import {
    AddTodolistAC,
    ChangeFilterAC,
    FilterValuesType,
    RemoveTodolistAC, TodolistDomainType,
    UpdateTodolistAC,
} from "./model/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./model/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model/store";
import {TaskStatuses, TaskType} from "./api/task-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state=> state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state=> state.tasks)

    const dispatch = useDispatch()
    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType)=> {
        dispatch(ChangeFilterAC(todolistId,filter))
    },[dispatch])
    const removeTask = useCallback((todolistId: string, taskId: string)=> {
        dispatch(RemoveTaskAC(taskId, todolistId))
    },[dispatch])
    const addTask = useCallback((todolistId: string, value: string)=> {
        dispatch(AddTaskAC(todolistId, value))
    },[dispatch])
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses)=> {
        dispatch(ChangeTaskStatusAC(taskId, status, todolistId))
    },[dispatch])
    const removeTodolist = useCallback((todolistId: string) =>{
        dispatch(RemoveTodolistAC(todolistId))
    },[dispatch])
    const addTodolist = useCallback((newTitle: string) =>  {
        dispatch(AddTodolistAC(newTitle))
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskID: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todolistId, taskID, newTitle))
    },[dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(UpdateTodolistAC(todolistId,newTitle))
    },[dispatch])

    type ThemeMod = "dark" | "light"
    const [themeMode, setThemeMode] = useState<ThemeMod>("light")
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

                            return <Grid key={tl.id} item>
                                <Paper elevation={6} sx={{padding: "15px"}}>
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
                                    />
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
