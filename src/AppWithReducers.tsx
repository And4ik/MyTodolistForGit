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
    FilterValuesType,
    RemoveTodolistAC,
    TodolistDomainType,
    todolistsReducer,
    UpdateTodolistAC,
} from "./model/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./model/task-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/task-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}

export function AppWithRedusers () {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistDomainType[], ActionsType>>(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: "", order: 0},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: "", order: 0},
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todolistID1, order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todolistID1, order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: v1(), title: 'ReactJS', status: TaskStatuses.New, todoListId: todolistID1, order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, todoListId: todolistID2, order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: v1(), title: 'GraphQL',status: TaskStatuses.New, todoListId: todolistID2, order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
        ],
    })
    function changeFilter(todolistId: string, filter: FilterValuesType) {
        dispatchToTodolists(ChangeFilterAC(todolistId,filter))
    }
    function removeTask(todolistId: string, taskId: string) {
        dispatchToTasks(RemoveTaskAC(taskId, todolistId))
    }
    function addTask(todolistId: string, value: string) {
        dispatchToTasks(AddTaskAC({
            todoListId: todolistId,
            title:value,
            status: TaskStatuses.New,
            addedDate: "",
            deadline:"",
            id: "fdsfsd",
            order:0,
            priority:0,
            description:"",
            startDate:"",
        }))
    }
    function changeTaskStatus(todolistId: string, taskId: string, status: TaskStatuses) {
        dispatchToTasks(ChangeTaskStatusAC(taskId, status, todolistId))
    }
    function removeTodolist(todolistId: string) {
        let action = RemoveTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    function addTodolist(newTitle: string) {
        let action = AddTodolistAC({
            id: v1(),
            title: newTitle,
            addedDate: "",
            order: 0
        })
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (todolistId: string, taskID: string, newTitle: string) => {
        dispatchToTasks(ChangeTaskTitleAC(todolistId, taskID, newTitle))
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
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
                                tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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

