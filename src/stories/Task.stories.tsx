import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../Task";

import {fn} from "@storybook/test";
import {useState} from "react";
import {action} from "@storybook/addon-actions";
import * as React from "react";

const meta: Meta<typeof Task> = {
  title: 'TODOLISTS/Task',
  component: Task,
  tags: ['autodocs'],
  parameters:{
    layout: "centered"
  },
  args: {
    task: {id: "3", title: "Js", isDone: false},
    todolistId: "qwertweqeqw",
    removeTask: fn(),
    changeTaskStatus: fn(),
    changeTaskTitle:  fn()
  }
};
export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
  args: {
    task: {id: "2", title: "HTML", isDone: true}
    ,}
};

const TaskToggle = () => {
  const [task, setTask] = useState({id: "2", title: "HTML", isDone: true})

  function changeTaskStatus() {
    setTask({...task, isDone: !task.isDone})
  }
  function changeTaskTitle(taskId: string, newTitle: string) {
    setTask({...task, title: newTitle})
  }

  return <Task task={task} todolistId={"123123dsaa"} removeTask={action("Task delete")} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
}
export const TaskToggleStory: Story = {
  render: () => <TaskToggle />
};