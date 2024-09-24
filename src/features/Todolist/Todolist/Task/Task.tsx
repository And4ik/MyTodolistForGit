import React, {ChangeEvent, memo} from 'react';
import {getListItemSx} from "../Todolist.styles";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TaskStatuses, TaskType} from "../../../../api/task-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    changeTaskTitle: (todolistId: string, taskID: string, newTitle: string) => void
};
export const Task = memo(({task,todolistId,removeTask,changeTaskStatus,changeTaskTitle}: TaskPropsType) => {
    const removeTaskHandler = () => {
        removeTask(todolistId, task.id)
    }
    const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
       changeTaskStatus(todolistId, task.id, newStatusValue ? TaskStatuses.Completed : TaskStatuses.New)
    }

    const onTitleChangeHandler =  (newTitle: string) => {
        changeTaskTitle(todolistId,task.id, newTitle)
    }

    return <ListItem sx={getListItemSx(task.status === TaskStatuses.Completed)}>
        <div>
            <EditableSpan oldTitle={task.title}
                          onClick={onTitleChangeHandler}/>
            <Checkbox
                checked={task.status === TaskStatuses.Completed} onChange={onTaskStatusChangeHandler}/>
        </div>
        <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
            <DeleteIcon fontSize="small"/>
        </IconButton>
    </ListItem>
});