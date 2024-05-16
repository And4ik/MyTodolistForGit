
import * as React from 'react';
// import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {filterButtonsContainerSx} from "../Todolist.styles";
import IconButton from "@mui/material/IconButton";

import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    onClick: (newTitle: string) => void
};
export const AddItemForm = (props: AddItemFormType) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle.trim() !== "") {
            props.onClick(newTitle)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }

    const buttonStyle = {
        maxWidth: "40px",
        maxHeight:"40px",
        minWidth:"40px",
        minHeight:"40px",
        }

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
                {/*<input*/}
                {/*    className={error ? "error" : ""}*/}
                {/*    type="text"*/}
                {/*    value={title}*/}
                {/*    onChange={onchangeHandler}*/}
                {/*    onKeyUp={onKeyUpHandler}*/}
                {/*/>*/}

                {/*<Button onClick={addTaskHandler} title={"x"}/>*/}
                <IconButton onClick={addTaskHandler}  color={"primary"}>
                    <ControlPoint/>
                </IconButton>
            </Box>
    );
};