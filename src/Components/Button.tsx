// @flow
import * as React from 'react';

type Props = {
    onClick: ()=> void
    title: string
    className?: string
};
export const Button = (props: Props) => {
    const onClickHandler = () => {
      props.onClick()
    }
    return (
            <button className={props.className} onClick={onClickHandler}>{props.title}</button>
    );
};