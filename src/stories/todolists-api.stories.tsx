import React, { useEffect, useState } from 'react'

import {todolistApi} from "../api/todolist-api";


export default {
    title: 'API for Todolist'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolist().then((res)=>{
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = "JSfffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        todolistApi.createTodolist(title).then((res)=> {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = "04751b04-69b2-4fab-a843-8b1259c992e8"
        todolistApi.deleteTodolist(todoID).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = "556a46ff-52c7-495c-b25d-44817e0ca62e"
        const title = "you will task"
        todolistApi.updateTodolist(todoID,title).then((res)=>{
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
