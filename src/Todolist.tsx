// @flow
import * as React from 'react';
import {FilterValuesType, TasksType} from "./App";
import {Button} from "./Components/Button";
import {ChangeEvent,KeyboardEvent, useState} from "react";


type Props = {
    title: string
    tasks: Array<TasksType>
    changeTasksStatus: (value: FilterValuesType)=> void
    removeTask: (taskId: string) => void
    addTask: (value: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean)=> void
    filter: FilterValuesType
};
export const Todolist = (props: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if(title.trim()!==""){
            props.addTask(title.trim())
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
    return (
        <div>
            <h3>{props.title}</h3>
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
                      props.removeTask(t.id)
                    }
                    const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newStatusValue)
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
            <Button className={props.filter === "all" ? "active-filter" :""} onClick={()=>{props.changeTasksStatus("all")}} title={"All"}/>
            <Button className={props.filter === "active" ? "active-filter" :""} onClick={()=>{props.changeTasksStatus("active")}} title={"Active"}/>
            <Button className={props.filter === "completed" ? "active-filter" :""} onClick={()=>{props.changeTasksStatus("completed")}} title={"Completed"}/>

        </div>
    );
};