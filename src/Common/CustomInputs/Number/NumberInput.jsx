import React from "react";
import s from './NumberInput.module.scss'

const NumberInput = (props) => {

    return (
        <span className={s.number}>
            <input className={s.numberInput} id={props.id} type="number" {...props.field}  />
        </span>
    )
}

export default NumberInput
