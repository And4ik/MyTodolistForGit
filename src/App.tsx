import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValuesType
}
type TasksStateType = {
  [key:string]:TasksType[]
}
function App() {
  // const [tasks, setTasks] = useState<TasksType[]>([
  //   {id: v1(), title: "React", isDone: true},
  //   {id: v1(), title: "HTML", isDone: false},
  //   {id: v1(), title: "View", isDone: false},
  //   {id: v1(), title: "CSS", isDone: true}
  // ])
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })



  function changeFilter(todolistId: string,value: FilterValuesType) {
    setTodolists(todolists.map(tl=> tl.id ===todolistId ? {...tl,filter:value}: tl))
  }
  function removeTask(todolistId: string,taskId: string) {
    setTasks({...tasks,[todolistId]:tasks[todolistId].filter(t=> t.id !==taskId)})
  }
  function addTask (todolistId: string,value: string) {
    let newTask = {id: v1(), title: value, isDone: false}
    setTasks({...tasks,[todolistId]: [newTask,...tasks[todolistId]]})
  }
  function changeTaskStatus(todolistId: string,taskId: string, taskStatus: boolean) {
    setTasks({...tasks,[todolistId]: tasks[todolistId].map(t=> t.id===taskId ? {...t, isDone:taskStatus} : t)})
  }
  function removeTodolist(todolistId: string) {
    setTodolists(todolists.filter(t=> t.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }
  return (
      <div className={"App"}>
        {todolists.map((tl)=>{
          let tasksForTodolist = tasks[tl.id]
          if (tl.filter==="active"){
            tasksForTodolist = tasks[tl.id].filter(t=> !t.isDone)
          }
          if (tl.filter==="completed"){
            tasksForTodolist = tasks[tl.id].filter(t=> t.isDone)
          }
          return (
              <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  tasks={tasksForTodolist}
                  title={tl.title}
                  changeFilter={changeFilter}
                  removeTask={removeTask}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  filter={tl.filter}
                  removeTodolist={removeTodolist}
              />
          )
        })}
      </div>
  );
}

export default App;
