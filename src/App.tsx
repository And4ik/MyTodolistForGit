import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"
export type TasksType = {
  id: number
  title: string
  isDone: boolean
}
function App() {
  const [tasks, setTasks] = useState<TasksType[]>([
    {id: 1, title: "React", isDone: true},
    {id: 2, title: "HTML", isDone: false},
    {id: 3, title: "View", isDone: false},
    {id: 4, title: "CSS", isDone: true}
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
  function removeTask(taskId: number) {
    setTasks(tasks.filter(t=> t.id !== taskId))
  }
  function addTask (value: string) {
    let newTask = {id: 1, title: value, isDone: false}
    setTasks([newTask, ...tasks])
  }
  return (
      <Todolist
          tasks={tasksForTodolist}
          title={"What to learn"}
          changeTasksStatus={changeTasksStatus}
          removeTask={removeTask}
          addTask={addTask}
      />
  );
}

export default App;
