import * as React from 'react';
import {memo, useCallback, useEffect} from 'react';

import {AddItemForm} from "../../../Components/AdditemForm/AddItemForm";
import {EditableSpan} from "../../../Components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "./Todolist.styles";
import {ButtonWithMemo} from "../../../Components/Button";
import {Task} from "./Task/Task";
import {FilterValuesType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/task-api";
import {useAppDispatch} from "../../../app/store";
import {getTasksTC} from "../task-reducer";


type Props = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todolistId: string, taskID: string, newTitle: string) => void
};
export const Todolist = memo((props: Props) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTasksTC(props.todolistId))
    }, [])

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = useCallback((newTitle: string) => {
        props.addTask(props.todolistId, newTitle)
    }, [props.addTask, props.todolistId])
    const updateTodolistHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.todolistId, newTitle)
    },[ props.changeTodolistTitle,props.todolistId])


    let tasks = props.tasks
    if (props.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t=> t.status === TaskStatuses.Completed)
    }
    const onAllClickHandler = useCallback(() => {props.changeFilter(props.todolistId, "all")
    },[props.changeFilter,props.todolistId])
    const onActiveClickHandler = useCallback( () => {props.changeFilter(props.todolistId, "active")
    },[props.changeFilter,props.todolistId])
    const onCompletedClickHandler = useCallback( ()=> {props.changeFilter(props.todolistId, "completed")
    },[props.changeFilter,props.todolistId])

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onClick={updateTodolistHandler}/>
                <IconButton onClick={removeTodolistHandler} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small"/>
                </IconButton>
            </h3>
            <AddItemForm onClick={addTaskHandler}/>
            <List>
                {tasks.map(t => {

                    return (
                        <Task key={t.id}
                                task={t}
                              todolistId={props.todolistId}
                              removeTask={props.removeTask}
                              changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle}/>
                    )
                })}
            </List>
            <Box sx={filterButtonsContainerSx}>
                <ButtonWithMemo onClick={onAllClickHandler} variant={props.filter === "all" ? "outlined" : "contained"} title={"All"} color="error"/>
                <ButtonWithMemo onClick={onActiveClickHandler} variant={props.filter === "active" ? "outlined" : "contained"} title={"Active"} color="primary"/>
                <ButtonWithMemo onClick={onCompletedClickHandler} variant={props.filter === "completed" ? "outlined" : "contained"} title={"Completed"} color="secondary"/>
            </Box>
        </div>
    );
});
