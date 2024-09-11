import React from 'react'
import {Provider} from "react-redux";

import {combineReducers, legacy_createStore} from "redux";

import {v1} from "uuid";
import {tasksReducer} from "../model/task-reducer";
import {todolistsReducer} from "../model/todolists-reducer";

import {TaskPriorities, TaskStatuses} from "../api/task-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState:{} = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: v1(), title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: v1(), title: "React Book", status: TaskStatuses.New, todoListId: "todolistId2", order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
