import type {Meta, StoryObj} from '@storybook/react';
import * as React from "react";
import {TaskWithRedux} from "../TaskWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../model/store";
import {TasksType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTaskAC} from "../model/task-reducer";

const meta: Meta<typeof TaskWithRedux> = {
  title: 'TODOLISTS/TaskWithRedux',
  component: TaskWithRedux,
  tags: ['autodocs'],
  parameters:{
    layout: "centered"
  },
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator]
};
export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const Task:React.FC = () => {
  const dispatch = useDispatch()
  let task = useSelector<AppRootStateType, TasksType>(state => state.tasks["todolistId1"][0])
  if (!task) {
    task = {id: v1(), title: "React and Redux", isDone: false}
    dispatch(AddTaskAC("todolistId1", "Default Task"))
  }

  return <TaskWithRedux task={task} todolistId={"todolistId1"} />
}
export const TaskWithReduxStory: Story = {
  render: () => <Task />
};