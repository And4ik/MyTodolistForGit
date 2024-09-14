import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    ChangeFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    deleteTodolistTC,
    FilterValuesType,
    getTodolistsTC,
    TodolistDomainType
} from "./todolists-reducer";
import {createTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "./task-reducer";
import {TaskStatuses} from "../../api/task-api";
import {Grid} from "@mui/material";
import {AddItemForm} from "../../Components/AdditemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/AppWithRedux";

export const TodolistsList: React.FC = () => {
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useAppDispatch()
    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(ChangeFilterAC(todolistId, filter))
    }, [dispatch])

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(createTaskTC(todolistId, value))
    }, [dispatch])

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        debugger
        dispatch(updateTaskStatusTC(todolistId, taskId, status))
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId))
    }, [dispatch])

    const addTodolist = useCallback((newTitle: string) => {
        dispatch(createTodolistTC(newTitle))
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistId: string, taskID: string, newTitle: string) => {
        dispatch(updateTaskTitleTC(todolistId, taskID, newTitle))
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitle))
    }, [dispatch])


    useEffect(() => {
        dispatch(getTodolistsTC)
    }, [dispatch])

    return <>
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
    </>
}