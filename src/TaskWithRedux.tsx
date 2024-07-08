import React from 'react';
import {getListItemSx} from "./Todolist.styles";
import {EditableSpan} from "./Components/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TasksType} from "./AppWithRedux";
import {ChangeEvent, memo} from "react";
import {useDispatch} from "react-redux";
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./model/task-reducer";

type TaskWithReduxPropsType = {
    task: TasksType
    todolistId: string

};
export const TaskWithRedux = memo(({task,todolistId}: TaskWithReduxPropsType) => {
    const dispatch = useDispatch()
    const removeTaskHandler = () => {
       dispatch(RemoveTaskAC(task.id,todolistId))
    }
    const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(ChangeTaskStatusAC(task.id, newStatusValue,todolistId))
    }
    const onTitleChangeHandler =  (newTitle: string) => {
        dispatch(ChangeTaskTitleAC(task.id, newTitle, todolistId))
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