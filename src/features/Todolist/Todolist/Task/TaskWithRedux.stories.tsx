import type { Meta, StoryObj } from "@storybook/react"
import { TaskWithRedux } from "./TaskWithRedux"
import { ReduxStoreProviderDecorator } from "app/ReduxStoreProviderDecorator"
import { TaskPriorities, TaskStatuses } from "features/Todolist/lib/enums/enums"
import { TaskType } from "features/Todolist/Todolist/Task/api/task-api"
import { AppRootStateType } from "app/store"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useSelector } from "react-redux"
import { v1 } from "uuid"

// const meta: Meta<typeof TaskWithRedux> = {
//   title: "TODOLISTS/TaskWithRedux",
//   component: TaskWithRedux,
//   tags: ["autodocs"],
//   parameters: {
//     layout: "centered",
//   },
//   decorators: [ReduxStoreProviderDecorator],
// }
// export default meta
// type Story = StoryObj<typeof TaskWithRedux>

// const Task: React.FC = () => {
//   const dispatch = useAppDispatch()
//   let task = useSelector<AppRootStateType, TaskType>((state) => state.tasks["todolistId1"][0])
//   if (!task) {
//     task = {
//       id: v1(),
//       title: "React and Redux",
//       status: TaskStatuses.New,
//       todoListId: "todolistId1",
//       order: 0,
//       addedDate: "",
//       priority: TaskPriorities.Low,
//       description: "",
//       startDate: "",
//       deadline: "",
//     }
//
//     dispatch(
//       AddTask({
//         task: {
//           todoListId: "fds",
//           title: "new titile",
//           status: TaskStatuses.New,
//           addedDate: "",
//           deadline: "",
//           id: "fdsfsd",
//           order: 0,
//           priority: 0,
//           description: "",
//           startDate: "",
//         },
//       }),
//     )
//   }
//
//   return <TaskWithRedux task={task} todolistId={"todolistId1"} />
// }
// export const TaskWithReduxStory: Story = {
//   render: () => <Task />,
// }
