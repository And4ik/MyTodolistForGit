import React, {ChangeEvent, useState} from 'react';

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
            ? <input
                value={newTitle}
                onBlur={editHandler}
                autoFocus
                onChange={onchangeHandler}/>
            :<span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};