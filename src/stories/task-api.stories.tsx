import React, {useEffect, useState} from 'react'
import {taskApi, TaskStatuses, UpdateTaskModelType} from "../api/task-api";

export default {
    title: 'API for Task',
}
export const getTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistId = "b50243d0-7316-42de-a213-e271d79b2de3"
        taskApi.getTasks(todolistId).then((res)=> {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "new TASKaaaa"
        const todolistId = "b50243d0-7316-42de-a213-e271d79b2de3"
        taskApi.createTask(todolistId,title).then((res)=> {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "b50243d0-7316-42de-a213-e271d79b2de3"
        const taskId = "262d1c36-61a7-43df-a682-8326b915d00c"
        taskApi.deleteTask(todolistId,taskId).then((res)=> {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "b50243d0-7316-42de-a213-e271d79b2de3"
        const taskId = "e3c7c6d0-e6ac-4ec5-b432-ce1923f294d0"

        const model: UpdateTaskModelType = {
            title: "it earl was new task",
            description: "",
            priority: 0,
            startDate: "",
            deadline: "",
            status: TaskStatuses.New,
        }
        taskApi.updateTask(todolistId,taskId,model).then((res)=> {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
