// @flow
import * as React from 'react';
import {FilterValuesType, TasksType} from "./App";
import {Button} from "./Components/Button";
import {ChangeEvent,KeyboardEvent, useState} from "react";


type Props = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    changeFilter: (todolistId: string,value: FilterValuesType)=> void
    removeTask: (todolistId: string,taskId: string) => void
    addTask: (todolistId: string,value: string) => void
    changeTaskStatus: (todolistId: string,taskId: string, taskStatus: boolean)=> void
    filter: FilterValuesType
    removeTodolist: (todolistId: string)=> void
};
export const Todolist = (props: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if(title.trim()!==""){
            props.addTask(props.todolistId,title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }

    }
    const onchangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
      if (event.key==="Enter"){
          addTaskHandler()
      }
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    return (
        <div>
            <h3>
                {props.title}
                <Button onClick={removeTodolistHandler} title={"x"}/>
            </h3>

            <input
                className={error ? "error": ""}
                type="text"
                value={title}
                onChange={onchangeHandler}
                onKeyUp={onKeyUpHandler}
            />
            <Button onClick={addTaskHandler} title={"x"}/>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {props.tasks.map(t=> {
                    const removeTaskHandler = () => {
                      props.removeTask(props.todolistId,t.id)
                    }
                    const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        props.changeTaskStatus(props.todolistId,t.id, newStatusValue)
                    }
                    return(
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <span>{t.title}</span>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeTaskStatusHandler}
                            />
                            <Button onClick={removeTaskHandler} title={"x"}/>
                        </li>
                    )
                })}
            </ul>
            <Button className={props.filter === "all" ? "active-filter" :""} onClick={()=>{props.changeFilter(props.todolistId,"all")}} title={"All"}/>
            <Button className={props.filter === "active" ? "active-filter" :""} onClick={()=>{props.changeFilter(props.todolistId,"active")}} title={"Active"}/>
            <Button className={props.filter === "completed" ? "active-filter" :""} onClick={()=>{props.changeFilter(props.todolistId,"completed")}} title={"Completed"}/>

        </div>
    );
};