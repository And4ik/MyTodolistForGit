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
function App() {
  const [tasks, setTasks] = useState<TasksType[]>([
    {id: v1(), title: "React", isDone: true},
    {id: v1(), title: "HTML", isDone: false},
    {id: v1(), title: "View", isDone: false},
    {id: v1(), title: "CSS", isDone: true}
  ])

  const [filter, setFilter] = useState<FilterValuesType>("all")
  let tasksForTodolist = tasks
  if (filter==="active"){
    tasksForTodolist = tasks.filter(t=> !t.isDone)
  }
  if (filter==="completed"){
    tasksForTodolist = tasks.filter(t=> t.isDone)
  }

  function changeTasksStatus(value: FilterValuesType) {
    setFilter(value)
  }
  function removeTask(taskId: string) {
    setTasks(tasks.filter(t=> t.id !== taskId))
  }
  function addTask (value: string) {
    let newTask = {id: v1(), title: value, isDone: false}
    setTasks([newTask, ...tasks])
  }
  function changeTaskStatus(taskId: string, taskStatus: boolean) {
    setTasks(tasks.map(t=> t.id===taskId ? {...t, isDone:taskStatus} : t))
  }
  return (
      <Todolist
          tasks={tasksForTodolist}
          title={"What to learn"}
          changeTasksStatus={changeTasksStatus}
          removeTask={removeTask}
          addTask={addTask}
          changeTaskStatus={changeTaskStatus}
      />
  );
}

export default App;
