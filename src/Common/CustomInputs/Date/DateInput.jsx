import React from "react";
import s from './DateInput.module.scss'
import calendar from './../../../assets/images/calendar-5.svg'
import {isAndroid} from 'react-device-detect'

const DateInput = (props) => {

    return (
        <span className={s.date}>
            {/*<label htmlFor={props.id}>Дата</label>*/}
            <input className={s.dateInput} id={props.id} type="date" {...props.field}  />
            {
                (!isAndroid) &&
                <label htmlFor={props.id}><img className={s.calendar} src={calendar} alt="calendar"/></label>
            }
        </span>
    )
}

export default DateInput
