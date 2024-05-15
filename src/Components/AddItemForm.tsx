
import * as React from 'react';
// import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';

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
        maxWidth: "30px",
        maxHeight:"30px",
        minWidth:"30px",
        minHeight:"30px",
        }

    return (
            <div>
                <input
                    className={error ? "error" : ""}
                    type="text"
                    value={title}
                    onChange={onchangeHandler}
                    onKeyUp={onKeyUpHandler}
                />
                {/*<Button onClick={addTaskHandler} title={"x"}/>*/}
                <Button style={buttonStyle} variant="contained" onClick={addTaskHandler}>+</Button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
    );
};