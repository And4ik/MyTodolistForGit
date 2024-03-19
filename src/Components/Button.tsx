// @flow
import * as React from 'react';

type Props = {
    onClick: ()=> void
    title: string
};
export const Button = (props: Props) => {
    const onClickHandler = () => {
      props.onClick()
    }
    return (
            <button onClick={onClickHandler}>{props.title}</button>
    );
};