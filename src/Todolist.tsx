// @flow
import * as React from 'react';
import {FilterValuesType, TasksType} from "./App";
// import {Button} from "./Components/Button";
import {ChangeEvent} from "react";
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


type Props = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    removeTask: (todolistId: string, taskId: string) => void
    addTask: (todolistId: string, value: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskID: string, newTitle: string)=> void
    updateTodolist:(todolistId: string, newTitle: string)=> void
};
export const Todolist = (props: Props) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskHandler = (newTitle: string) => {
      props.addTask(props.todolistId,newTitle)
    }
    const updateTodolistHandler = (newTitle:string) => {
      props.updateTodolist(props.todolistId,newTitle)
    }
    const updateTaskHandler = (taskId: string,newTitle: string) => {
        props.updateTask(props.todolistId, taskId,newTitle,)
    }
    const buttonStyle = {
        maxWidth: "30px",
        maxHeight:"30px",
        minWidth:"30px",
        minHeight:"30px",
    }
    return (
        <div>
            <h3>
                <EditableSpan oldTitle={props.title} onClick={updateTodolistHandler}/>
                {/*{props.title}*/}
                {/*<Button onClick={removeTodolistHandler} title={"x"}/>*/}
                <IconButton onClick={removeTodolistHandler} aria-label="delete" size="small">
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </h3>
            <AddItemForm  onClick={addTaskHandler}/>
            <ul>
                {props.tasks.map(t => {
                    const removeTaskHandler = () => {
                        props.removeTask(props.todolistId, t.id)
                    }
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        props.changeTaskStatus(props.todolistId, t.id, newStatusValue)
                    }

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            {/*<span>{t.title}</span>*/}
                            <EditableSpan oldTitle={t.title} onClick={(newTitle:string)=>updateTaskHandler(t.id,newTitle)}/>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            {/*<Button onClick={removeTaskHandler} title={"x"}/>*/}
                            <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <Button onClick={() => {props.changeFilter(props.todolistId, "all")}}
                    variant={props.filter === "all" ? "outlined" : "contained"} color="error">All</Button>
            <Button onClick={() => {props.changeFilter(props.todolistId, "active")}}
                    variant={props.filter === "active" ? "outlined" : "contained"} color="primary">Active</Button>
            <Button onClick={() => {props.changeFilter(props.todolistId, "completed")}}
                    variant={props.filter === "completed" ? "outlined" : "contained"} color="secondary">Completed</Button>
            {/*<Button className={props.filter === "all" ? "active-filter" : ""} onClick={() => {*/}
            {/*    props.changeFilter(props.todolistId, "all")*/}
            {/*}} title={"All"}/>*/}
            {/*<Button className={props.filter === "active" ? "active-filter" : ""} onClick={() => {*/}
            {/*    props.changeFilter(props.todolistId, "active")*/}
            {/*}} title={"Active"}/>*/}
            {/*<Button className={props.filter === "completed" ? "active-filter" : ""} onClick={() => {*/}
            {/*    props.changeFilter(props.todolistId, "completed")*/}
            {/*}} title={"Completed"}/>*/}

        </div>
    );
};