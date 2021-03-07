import React from "react";

const TextError = (props) => {
    return (
        <div className={'form__error'}>
            {props.children}
        </div>
    )
}

export default TextError
