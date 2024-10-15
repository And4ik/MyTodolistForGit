import type { Meta, StoryObj } from "@storybook/react"

import { action } from "@storybook/addon-actions"
import { AddItemForm, AddItemFormType } from "./AddItemForm"
import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import Box from "@mui/material/Box"
import { filterButtonsContainerSx } from "../../features/Todolist/Todolist/Todolist.styles"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import { ControlPoint } from "@mui/icons-material"
import * as React from "react"

const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,

  tags: ["autodocs"],
  argTypes: {
    onClick: {
      description: "Button clicked inside form",
      action: "clicked",
    },
  },
}
export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
  args: {
    onClick: action("Button clicked inside form"),
  },
}
const AddItemFormWithError = memo((props: AddItemFormType) => {
  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>("Title is required")
  const addTaskHandler = () => {
    if (title.trim() !== "") {
      props.onClick(title)
      setTitle("")
    } else {
      setError("Title is required")
    }
  }

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null)
    }
    if (event.key === "Enter") {
      addTaskHandler()
    }
  }

  // const buttonStyle = {
  //     maxWidth: "40px",
  //     maxHeight:"40px",
  //     minWidth:"40px",
  //     minHeight:"40px",
  //     }

  return (
    <Box sx={filterButtonsContainerSx}>
      <TextField
        error={!!error} // !! для того чтобы превратить в булеан
        id="outlined-basic"
        label={error ? error : "Enter a title"}
        variant="outlined"
        size="small"
        value={title}
        onChange={onchangeHandler}
        onKeyUp={onKeyUpHandler}
      />
      <IconButton onClick={addTaskHandler} color={"primary"}>
        <ControlPoint />
      </IconButton>
    </Box>
  )
})
export const AddItemFormWithErrorStory: Story = {
  render: (args) => <AddItemFormWithError onClick={args.onClick} />,
}
