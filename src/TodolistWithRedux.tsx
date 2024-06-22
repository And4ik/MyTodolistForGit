import * as React from 'react';
import {ChangeEvent} from 'react';
import {TasksType, TodolistType} from "./App";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model/store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./model/task-reducer";
import {ChangeFilterAC, RemoveTodolistAC, UpdateTodolistAC} from "./model/todolists-reducer";


type PropsType = {
    // todolistId: string
    todolist: TodolistType
    // title: string
    // tasks: Array<TasksType>
    // changeFilter: (todolistId: string, filter: FilterValuesType) => void
    // removeTask: (todolistId: string, taskId: string) => void
    // addTask: (todolistId: string, value: string) => void
    // changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    // filter: FilterValuesType
    // removeTodolist: (todolistId: string) => void
    // updateTask: (todolistId: string, taskID: string, newTitle: string) => void
    // updateTodolist: (todolistId: string, newTitle: string) => void
};
export function TodolistWithRedux  ({todolist}: PropsType) {
    const {id, title, filter} = todolist
    // const todolist = useSelector<AppRootStateType, TodolistType>(state => state.todolists.filter(tl=> tl.id === props.todolistId)[0])
    let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])
    const dispatch = useDispatch()
    const removeTodolistHandler = () => {
        // props.removeTodolist(props.todolistId)
        dispatch(RemoveTodolistAC(id))
    }
    const addTaskHandler = () => {
        // props.addTask(props.todolistId, newTitle)
        dispatch(AddTaskAC(title,id))
    }
    const updateTodolistHandler = (newTitle: string) => {
        // props.updateTodolist(props.todolistId, newTitle)
        dispatch(UpdateTodolistAC(id, newTitle))
    }
    const updateTaskHandler = (taskId: string, newTitle: string) => {
        // props.updateTask(props.todolistId, taskId, newTitle,)
        dispatch(ChangeTaskTitleAC(id, taskId, newTitle))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} onClick={updateTodolistHandler}/>
                {/*<Button onClick={removeTodolistHandler} title={"x"}/>*/}
                <IconButton onClick={removeTodolistHandler} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>
            <AddItemForm onClick={addTaskHandler}/>
            <List>
                {tasks.map(t => {
                    const removeTaskHandler = () => {
                        dispatch(RemoveTaskAC(id, t.id))
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        dispatch(ChangeTaskStatusAC(t.id, newStatusValue,id))
                    }
                    return (
                        <ListItem key={t.id}
                                  sx={getListItemSx(t.isDone)}>
                            <div>
                                <EditableSpan oldTitle={t.title}
                                              onClick={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                                <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                            </div>
                            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
            <Box sx={filterButtonsContainerSx}>
                <Button onClick={() => {
                    dispatch(ChangeFilterAC(id, "all"))
                }}
                        variant={filter === "all" ? "outlined" : "contained"} color="error">All</Button>
                <Button onClick={() => {
                    dispatch(ChangeFilterAC(id, "active"))
                }}
                        variant={filter === "active" ? "outlined" : "contained"} color="primary">Active</Button>
                <Button onClick={() => {
                    dispatch(ChangeFilterAC(id, "completed"))
                }}
                        variant={filter === "completed" ? "outlined" : "contained"}
                        color="secondary">Completed</Button>
            </Box>
        </div>
    );
}