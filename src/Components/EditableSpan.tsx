import React, {ChangeEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanType = {
    oldTitle: string
    onClick: (newTitle: string)=> void
};
export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const editHandler = () => {
          setEdit(!edit)
        if (edit)(
            addTask()
        )
    }
    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTask = () => {
      props.onClick(newTitle )
    }
    return (
        edit
            ? <TextField
                variant={'outlined'}
                value={newTitle}
                onBlur={editHandler}
                autoFocus
                size={'small'}
                onChange={onchangeHandler}/>
            :<span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};