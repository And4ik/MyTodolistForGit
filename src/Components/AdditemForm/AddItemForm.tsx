
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "../../features/Todolist/Todolist/Todolist.styles";
import IconButton from "@mui/material/IconButton";

import {ControlPoint} from "@mui/icons-material";

export type AddItemFormType = {
    onClick: (newTitle: string) => void
    disabled?:boolean
};
export const AddItemForm = memo(  (props: AddItemFormType) => {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
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
                    disabled={props.disabled}
                />
                <IconButton onClick={addTaskHandler} disabled={props.disabled} color={"primary"}>
                    <ControlPoint/>
                </IconButton>
            </Box>
    );
});