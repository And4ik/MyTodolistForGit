import React from "react"
import { getListItemSx } from "../Todolist.styles"
import { EditableSpan } from "Components/EditableSpan/EditableSpan"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent, memo } from "react"
import { useDispatch } from "react-redux"

import { TaskStatuses, TaskType } from "api/task-api"
import { ChangeTaskStatus, ChangeTaskTitle, RemoveTask } from "features/Todolist/tasksSlice"

type TaskWithReduxPropsType = {
  task: TaskType
  todolistId: string
}
export const TaskWithRedux = memo(({ task, todolistId }: TaskWithReduxPropsType) => {
  const dispatch = useDispatch()
  const removeTaskHandler = () => {
    dispatch(RemoveTask({ taskId: task.id, todolistId }))
  }
  const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(
      ChangeTaskStatus({
        taskId: task.id,
        status: newStatusValue ? TaskStatuses.Completed : TaskStatuses.New,
        todolistId,
      }),
    )
  }
  const onTitleChangeHandler = (newTitle: string) => {
    dispatch(ChangeTaskTitle({ taskId: task.id, title: newTitle, todolistId }))
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatuses.Completed)}>
      <div>
        <EditableSpan oldTitle={task.title} onClick={onTitleChangeHandler} />
        <Checkbox checked={task.status === TaskStatuses.Completed} onChange={onTaskStatusChangeHandler} />
      </div>
      <IconButton aria-label="delete" size="small" onClick={removeTaskHandler}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </ListItem>
  )
})
