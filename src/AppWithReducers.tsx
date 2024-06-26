import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./Components/AddItemForm";
import {Container, createTheme, CssBaseline, Grid, ThemeProvider} from "@mui/material";
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import {AppBarHeader} from "./Components/AppBarHeader";
import {
    ActionsType,
    AddTodolistAC,
    ChangeFilterAC,
    RemoveTodolistAC,
    todolistsReducer, UpdateTodolistAC,
} from "./model/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./model/task-reducer";

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

function AppWithRedusers() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], ActionsType>>(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })
    function changeFilter(todolistId: string, filter: FilterValuesType) {
        // setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filter} : tl))
        dispatchToTodolists(ChangeFilterAC(todolistId,filter))
    }
    function removeTask(todolistId: string, taskId: string) {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
        dispatchToTasks(RemoveTaskAC(taskId, todolistId))
    }
    function addTask(todolistId: string, value: string) {
        // let newTask = {id: v1(), title: value, isDone: false}
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        dispatchToTasks(AddTaskAC(todolistId, value))
    }
    function changeTaskStatus(todolistId: string, taskId: string, taskStatus: boolean) {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
        dispatchToTasks(ChangeTaskStatusAC(taskId, taskStatus, todolistId))
    }
    function removeTodolist(todolistId: string) {
        // setTodolists(todolists.filter(t => t.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks})
        let action = RemoveTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function addTodolist(newTitle: string) {
        // const newID = v1()
        // const newTodolist: TodolistType = {id: newID, title: newTitle, filter: 'all'}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({...tasks, [newID]: []})
        let action = AddTodolistAC(newTitle)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTask = (todolistId: string, taskID: string, newTitle: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskID ? {...t, title: newTitle} : t)})
        dispatchToTasks(ChangeTaskTitleAC(todolistId, taskID, newTitle))
    }
    const updateTodolist = (todolistId: string, newTitle: string) => {
        // setTodolists(todolists.map(el => el.id === todolistId ? {...el, title: newTitle} : el))
        dispatchToTodolists(UpdateTodolistAC(todolistId,newTitle))
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
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
                            }
                            return <Grid item>
                                <Paper elevation={6} sx={{padding: "15px"}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        tasks={tasksForTodolist}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
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
export default AppWithRedusers;
