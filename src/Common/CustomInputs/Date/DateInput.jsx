import React from "react";
import s from './DateInput.module.scss'
import calendar from './../../../assets/images/calendar-5.svg'

const DateInput = (props) => {

    let disabled

    if (props.id === 'dateOfRegistration' && props.form.values.academicDegree === 'Specialist') {
        disabled = true
    }
    else {
        disabled = false
    }

    return (
        <span className={s.date}>
            {/*<label htmlFor={props.id}>Дата</label>*/}
            <input disabled={disabled} className={s.dateInput} id={props.id} type="date" {...props.field}  />
            <label htmlFor={props.id}><img onClick={() => document.getElementById(props.id).select()} className={s.calendar} src={calendar} alt="calendar"/></label>
        </span>
    )
}

export default DateInput
