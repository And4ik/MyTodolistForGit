
import * as React from 'react';
import {FilterValuesType, TasksType} from "./App";
import {ChangeEvent} from "react";
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


type Props = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitle: string) => void
};
export const Todolist = (props: Props) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }
    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistId, newTitle)
    }
    const updateTaskHandler = (taskId: string, newTitle: string) => {
        props.updateTask(props.todolistId, taskId, newTitle,)
    }
    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onClick={updateTodolistHandler}/>
                {/*<Button onClick={removeTodolistHandler} title={"x"}/>*/}
                <IconButton onClick={removeTodolistHandler} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>
            <AddItemForm onClick={addTaskHandler}/>
            <List>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistId, t.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        props.changeTaskStatus(props.todolistId, t.id, newStatusValue)
                    }
                    return (
                        <ListItem key={t.id}
                                  sx={getListItemSx(t.isDone)}>
                            <div>
                                <EditableSpan oldTitle={t.title}
                                              onClick={(newTitle: string) => updateTaskHandler(t.id, newTitle)}/>
                                <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                            </div>
                            {/*<Button onClick={removeTaskHandler} title={"x"}/>*/}
                            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                                <DeleteIcon fontSize="small"/>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
            <Box sx={filterButtonsContainerSx}>
                <Button onClick={() => {
                    props.changeFilter(props.todolistId, "all")
                }}
                        variant={props.filter === "all" ? "outlined" : "contained"} color="error">All</Button>
                <Button onClick={() => {
                    props.changeFilter(props.todolistId, "active")
                }}
                        variant={props.filter === "active" ? "outlined" : "contained"} color="primary">Active</Button>
                <Button onClick={() => {
                    props.changeFilter(props.todolistId, "completed")
                }}
                        variant={props.filter === "completed" ? "outlined" : "contained"}
                        color="secondary">Completed</Button>
            </Box>
        </div>
    );
};