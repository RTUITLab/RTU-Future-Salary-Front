import React, {useEffect} from 'react'
import s from './DateInput.module.scss'
import calendar from './../../../assets/images/calendar-5.svg'
import {isAndroid} from 'react-device-detect'
import {format} from 'date-fns'

const DateInput = (props) => {

    let data = new Date(props.field.value)

    useEffect(() => {
        if((props.form.values.academicDegree === 'Master' && props.form.values.academicDegreeCourse !== '6') || (props.form.values.academicDegree === 'Bachelor')) {
            if (data.getMonth() === 6) {
                props.form.setFieldValue('dateOfRegistration', format(new Date(data.getFullYear(), data.getMonth() + 2, 1), 'yyyy-MM-dd'))
                props.form.setFieldError('dateOfRegistration', '')
            }
            else if (data.getMonth() === 7) {
                props.form.setFieldValue('dateOfRegistration',  format(new Date(data.getFullYear(), data.getMonth() + 1, 1), 'yyyy-MM-dd'))
                props.form.setFieldError('dateOfRegistration', '')
            }
        }
    }, [props.form.values.dateOfRegistration])

    return (
        <span className={s.date}>
            <input className={s.dateInput} id={props.id} type="date" {...props.field}  />
            {
                (!isAndroid) &&
                <label htmlFor={props.id}><img className={s.calendar} src={calendar} alt="calendar"/></label>
            }
        </span>
    )
}

export default DateInput
