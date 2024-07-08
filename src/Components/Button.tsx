import  React from 'react';
import {memo} from "react";
import {Button} from "@mui/material";
import {ButtonProps} from "@mui/material/Button";

type ButtonWithMemoPropsType = {} & ButtonProps
export const ButtonWithMemo = memo(({variant, onClick,color,title, ...rest}: ButtonWithMemoPropsType) => {
    return (
            <Button
                variant={variant}
                color={color}
                onClick={onClick}
                {...rest}
            >{title}</Button>
    );
});
