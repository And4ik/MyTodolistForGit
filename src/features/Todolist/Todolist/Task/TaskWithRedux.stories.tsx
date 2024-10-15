import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { TaskWithRedux } from "./TaskWithRedux"
import { ReduxStoreProviderDecorator } from "../../../../app/ReduxStoreProviderDecorator"
import { useDispatch, useSelector } from "react-redux"
import { AppRootStateType } from "../../../../app/store"

import { v1 } from "uuid"
import { AddTaskAC } from "../../task-reducer"
import { TaskPriorities, TaskStatuses, TaskType } from "../../../../api/task-api"

const meta: Meta<typeof TaskWithRedux> = {
  title: "TODOLISTS/TaskWithRedux",
  component: TaskWithRedux,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof TaskWithRedux>

const Task: React.FC = () => {
  const dispatch = useDispatch()
  let task = useSelector<AppRootStateType, TaskType>((state) => state.tasks["todolistId1"][0])
  if (!task) {
    task = {
      id: v1(),
      title: "React and Redux",
      status: TaskStatuses.New,
      todoListId: "todolistId1",
      order: 0,
      addedDate: "",
      priority: TaskPriorities.Low,
      description: "",
      startDate: "",
      deadline: "",
    }
    dispatch(
      AddTaskAC({
        todoListId: "fds",
        title: "new titile",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        id: "fdsfsd",
        order: 0,
        priority: 0,
        description: "",
        startDate: "",
      }),
    )
  }

  return <TaskWithRedux task={task} todolistId={"todolistId1"} />
}
export const TaskWithReduxStory: Story = {
  render: () => <Task />,
}
