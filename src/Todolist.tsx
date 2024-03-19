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
};
export const Todolist = (props: Props) => {
    const [title, setTitle] = useState("")
    const addTaskHandler = () => {
      props.addTask(title)
        setTitle("")
    }
    const onchangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key==="Enter"){
          addTaskHandler()
      }
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <input
                type="text"
                value={title}
                onChange={onchangeHandler}
                onKeyUp={onKeyUpHandler}
            />
            <Button onClick={addTaskHandler} title={"x"}/>
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
                        <li key={t.id}>
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
            <Button onClick={()=>{props.changeTasksStatus("all")}} title={"All"}/>
            <Button onClick={()=>{props.changeTasksStatus("active")}} title={"Active"}/>
            <Button onClick={()=>{props.changeTasksStatus("completed")}} title={"Completed"}/>

        </div>
    );
};