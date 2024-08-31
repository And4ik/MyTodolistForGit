import React, { useEffect, useState } from 'react'
import {taskApi} from "../api/task-api";

export default {
    title: 'API for Task',
}
export const GetTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {

        const todolistId = "b50243d0-7316-42de-a213-e271d79b2de3"
        taskApi.getTask(todolistId).then((res)=> {
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
        const title = "it earl was new task"
        taskApi.updateTask(todolistId,taskId,title).then((res)=> {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
