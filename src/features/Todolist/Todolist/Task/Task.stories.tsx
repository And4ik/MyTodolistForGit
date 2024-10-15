import type { Meta, StoryObj } from "@storybook/react"
import { Task } from "./Task"

import { fn } from "@storybook/test"
import * as React from "react"
import { useState } from "react"
import { action } from "@storybook/addon-actions"
import { TaskPriorities, TaskStatuses } from "../../../../api/task-api"

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/Task",
  component: Task,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    task: {
      id: "3",
      title: "Js",
      status: TaskStatuses.New,
      todoListId: "todolistID1",
      order: 0,
      addedDate: "",
      priority: TaskPriorities.Low,
      description: "",
      startDate: "",
      deadline: "",
    },
    todolistId: "New",
    removeTask: fn(),
    changeTaskStatus: fn(),
    changeTaskTitle: fn(),
  },
}
export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
  args: {
    task: {
      id: "2",
      title: "HTML",
      status: TaskStatuses.Completed,
      todoListId: "todolistID1",
      order: 0,
      addedDate: "",
      priority: TaskPriorities.Low,
      description: "",
      startDate: "",
      deadline: "",
    },
  },
}

const TaskToggle = () => {
  const [task, setTask] = useState({
    id: "2",
    title: "HTML",
    status: TaskStatuses.Completed,
    todoListId: "todolistID1",
    order: 0,
    addedDate: "",
    priority: TaskPriorities.Low,
    description: "",
    startDate: "",
    deadline: "",
  })

  function changeTaskStatus() {
    const newStatus = task.status === TaskStatuses.Completed ? TaskStatuses.New : TaskStatuses.Completed
    setTask({ ...task, status: newStatus })
  }
  function changeTaskTitle(newTitle: string) {
    setTask({ ...task, title: newTitle })
  }

  return (
    <Task
      task={task}
      todolistId={"todolistID2"}
      removeTask={action("Task delete")}
      changeTaskStatus={changeTaskStatus}
      changeTaskTitle={changeTaskTitle}
    />
  )
}
export const TaskToggleStory: Story = {
  render: () => <TaskToggle />,
}
