import React from "react"
import { getListItemSx } from "../Todolist.styles"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import Checkbox from "@mui/material/Checkbox"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import ListItem from "@mui/material/ListItem"
import { ChangeEvent, memo } from "react"

import { TaskType } from "features/Todolist/Todolist/Task/api/task-api"
import { removeTask, updateTaskStatus, updateTaskTitle } from "features/Todolist/Todolist/Task/tasksSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { TaskStatuses } from "features/Todolist/lib/enums/enums"

type TaskWithReduxPropsType = {
  task: TaskType
  todolistId: string
}

export const TaskWithRedux = memo(({ task, todolistId }: TaskWithReduxPropsType) => {
  const dispatch = useAppDispatch()
  const removeTaskHandler = () => {
    dispatch(removeTask({ taskId: task.id, todolistId }))
  }
  const onTaskStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(
      updateTaskStatus({
        taskId: task.id,
        status: newStatusValue ? TaskStatuses.Completed : TaskStatuses.New,
        todolistId,
      }),
    )
  }
  const onTitleChangeHandler = (newTitle: string) => {
    dispatch(updateTaskTitle({ taskId: task.id, title: newTitle, todolistId }))
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
