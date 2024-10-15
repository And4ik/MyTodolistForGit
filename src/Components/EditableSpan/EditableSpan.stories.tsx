import type { Meta, StoryObj } from "@storybook/react"

import { action } from "@storybook/addon-actions"
import { AddItemForm, AddItemFormType } from "../AdditemForm/AddItemForm"
import { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import Box from "@mui/material/Box"
import { filterButtonsContainerSx } from "../../features/Todolist/Todolist/Todolist.styles"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import { ControlPoint } from "@mui/icons-material"
import * as React from "react"
import { EditableSpan } from "./EditableSpan"
import { fn } from "@storybook/test"

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/EditableSpan",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
    oldTitle: "JS and HTML",
  },
}
export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {}
