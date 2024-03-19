// @flow
import * as React from 'react';
import {FilterValuesType, TasksType} from "./App";
import {Button} from "./Components/Button";
import {ChangeEvent, useState} from "react";


type Props = {
    title: string
    tasks: Array<TasksType>
    changeTasksStatus: (value: FilterValuesType)=> void
    removeTask: (taskId: number) => void
    addTask: (value: string) => void
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
    return (
        <div>
            <h3>{props.title}</h3>
            <input

                value={title}
                onChange={onchangeHandler}
            />
            <Button onClick={addTaskHandler} title={"x"}/>
            <ul>
                {props.tasks.map(t=> {
                    const removeTaskHandler = () => {
                      props.removeTask(t.id)
                    }
                    return(
                        <li key={t.id}>
                            <span>{t.title}</span>
                            <input type="checkbox" checked={t.isDone}/>
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