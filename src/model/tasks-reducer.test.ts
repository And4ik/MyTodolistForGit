import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./task-reducer";


import { TasksStateType } from '../App'
import {AddTodolistAC, RemoveTodolistAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/task-api";
let startState: TasksStateType
beforeEach(()=>{
     startState = {
        'todolistId1': [
            {id: '1', title: 'CSS',  status: TaskStatuses.New, todoListId: 'todolistId1', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: '2', title: 'JS',  status: TaskStatuses.Completed, todoListId: 'todolistId1', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""}
        ],
        'todolistId2': [
            {id: '1', title: 'bread',  status: TaskStatuses.New, todoListId: 'todolistId2', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: '2', title: 'milk',  status: TaskStatuses.Completed, todoListId: 'todolistId2', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""}
        ]
    }
})

test('correct task should be deleted from correct array', () => {
    const action = RemoveTaskAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)
    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS',  status: TaskStatuses.New, todoListId: 'todolistId1', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: '2', title: 'JS',  status: TaskStatuses.Completed, todoListId: 'todolistId1', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', order: 0, addedDate:"", priority:TaskPriorities.Low,description: "",startDate: "",deadline:""}
        ]
    })
})
test('correct task should be added to correct array', () => {
    const action = AddTaskAC('juce', 'todolistId2')
    const endState = tasksReducer(startState, action)
    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test('status of specified task should be changed', () => {
    const action = ChangeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')
    const endState = tasksReducer(startState, action)
    expect((endState['todolistId2'][1].status)).toBe(TaskStatuses.New)
    expect((endState['todolistId1'][1].status)).toBe(TaskStatuses.Completed)
})
test('title be changed', () => {
    const action = ChangeTaskTitleAC('todolistId2', "3", "coffee")
    const endState = tasksReducer(startState, action)
    expect((endState['todolistId2'][2].title)).toBe("coffee")
})
test('new array should be added when new todolist is added', () => {
    const action = AddTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState) // ['todolistId1', 'todolistId2', `newKey`]
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const action = RemoveTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
