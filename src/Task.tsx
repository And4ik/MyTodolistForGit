import React from 'react';
import {getListItemSx} from "./Todolist.styles";
import {EditableSpan} from "./Components/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TasksType} from "./AppWithRedux";
import {ChangeEvent, memo} from "react";

type TaskPropsType = {
    task: TasksType
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskID: string, newTitle: string) => void
};
export const Task = memo(({task,todolistId,removeTask,changeTaskStatus,changeTaskTitle}: TaskPropsType) => {
    console.log("Task is changed")
    const removeTaskHandler = () => {
        removeTask(todolistId, task.id)
    }
    const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        changeTaskStatus(todolistId, task.id, newStatusValue)
    }
    const onTitleChangeHandler =  (newTitle: string) => {
        changeTaskTitle(task.id, newTitle, todolistId)
    }

    return <ListItem sx={getListItemSx(task.isDone)}>
        <div>
            <EditableSpan oldTitle={task.title}
                          onClick={onTitleChangeHandler}/>
            <Checkbox checked={task.isDone} onChange={onTaskStatusChangeHandler}/>
        </div>
        <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </ListItem>
});