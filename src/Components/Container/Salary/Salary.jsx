import React, {useState} from 'react'
import s from './Salary.module.scss'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import TextError from "../../../Common/TextError";
import Graphic from "../Graphic/Graphic";
import {format} from 'date-fns'
import {getDateOfDissertation} from "../../../Common/getDateOfDissertation";
import DateInput from "../../../Common/CustomInputs/Date/DateInput";
import NumberInput from "../../../Common/CustomInputs/Number/NumberInput";
import arrows from './../../../assets/images/arrows.svg'
import {getDateOfRegistration} from "../../../Common/getDateOfRegistration";
import * as Yup from "yup";
import cl from 'classnames'

const Salary = (props) => {

    const [minRegister, setMinRegister] = useState(format(getDateOfRegistration('Master', '1'), 'yyyy-MM-dd'))
    const [minDissertation, setMinDissertation] = useState(format(getDateOfDissertation(new Date(), 'Master', '1', 1), 'yyyy-MM-dd'))

    const setMinRegisterDate = (status, course) => {
        let today = new Date()
        if(status === 'Master') {
            if(course === '1' || course === '6' || course === '2') { //Если выпускник или ещё учится
                if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                    setMinRegister(format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'yyyy-MM-dd'))
                }
                else {
                    setMinRegister(format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd'))

                }
            }
            else if(course === '0') { //Если поступает в магу, то только с 1 сен может оформиться
                if (today.getMonth() < 8) {
                    setMinRegister(format(new Date(today.getFullYear(), 8, 1), 'yyyy-MM-dd'))
                }
                else
                    setMinRegister(format(new Date(today.getFullYear() + 1, 8, 1), 'yyyy-MM-dd'))
            }
        }
        else if (status === 'PreCandidate') {
            if(course === '0' || course === '6' || course === '1' || course === '2' || course === '3' || course === '4') { //Если выпускник или ещё учится
                if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                    setMinRegister(format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'yyyy-MM-dd'))
                }
                else {
                    setMinRegister(format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd'))
                }
            }
        }
        else if (status === 'Bachelor') {
            if(course !== '6') {
                if(today.getMonth() < 8) { //Если он учится в бакалавриате или поступает, то расчитываем ему 1 сен, когда он поступит в магу
                    setMinRegister(format(new Date(today.getFullYear() + 4 - Math.floor(course), 8, 1), 'yyyy-MM-dd'))
                }
                else
                    setMinRegister(format(new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1), 'yyyy-MM-dd'))
            }
            else { //Если он выпускник бакалвриата, то расчитываем ему оформление 1 сен след уч года
                if(today.getMonth() < 8) {
                    setMinRegister(format(new Date(today.getFullYear(), 8, 1), 'yyyy-MM-dd'))
                }
                else
                    setMinRegister(format(new Date(today.getFullYear() + 1, 8, 1), 'yyyy-MM-dd'))
            }
        }
        else if (status === 'Specialist') {
            if(course !== '6') {
                if(today.getMonth() < 8) { //Если он учится в спец или поступает, то расчитываем ему 1 сен, когда он поступит в аспирантуру
                    setMinRegister(format(new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1), 'yyyy-MM-dd'))
                }
                else
                    setMinRegister(format(new Date(today.getFullYear() + 6 - Math.floor(course), 8, 1), 'yyyy-MM-dd'))
            }
            else { //Если он выпускник специалитета, то он может работать с 1 числа след месяца
                if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                    setMinRegister(format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'yyyy-MM-dd'))
                }
                else {
                    setMinRegister(format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd'))
                }
            }
        }
    }

    const setMinDissertationDate = (status, course) => {
        setMinDissertation(format(getDateOfDissertation(new Date(), status, course, 1), 'yyyy-MM-dd'))
    }

    let today = new Date()
    today = format(today.setDate(today.getDate() - 6573), 'yyyy-MM-dd') //18 лет
    let maxRegister = new Date()
    maxRegister = format(maxRegister.setDate(maxRegister.getDate() + 3652), 'yyyy-MM-dd') //10 лет
    let maxDissertation = new Date()
    maxDissertation = format(maxDissertation.setDate(maxDissertation.getDate() + 4748), 'yyyy-MM-dd') //13 лет

    let validationSchema = Yup.object({
        academicDegree: Yup.string()
            .required('Пожалуйста, введите ученую степерь'),
        workExperience: Yup.number()
            .min(0, 'Опыт не может быть отрицательным')
            .max(120, 'У вас может быть максимум 10 лет опыта')
            .required('Пожалуйста, введите опыт работы'),
        dateOfBirth: Yup.date()
            .max(today, 'Вам должно быть минимум 18 лет')
            .min('1921-01-01', 'Максимум 100 лет')
            .required('Пожалуйста, введите дату рождения'),
        dateOfRegistration: Yup.date()
            .min(minRegister, 'Невозможная дата оформления')
            .max(maxRegister, 'Можно указывать максимум на 10 лет вперед')
            .required('Пожалуйста, введите дату оформления'),
        dateOfDissertationDefense: Yup.date()
            .min(minDissertation, 'Невозможная дата защиты кандидатской')
            .max(maxDissertation, 'Можно указывать максимум на 13 лет вперед')
            .required('Пожалуйста, введите дату защиты кандидатской диссертации'),
    })

    return (
        <div className={'outer'}>
            <div className={'container'}>
                <h1 className={s.title}>Калькулятор гарантированных выплат ППС <span>(текущая дата: {format(new Date(), 'dd-MM-yyyy')})</span></h1>
                <Formik initialValues={props.initialValues}
                        validationSchema={validationSchema}
                        onSubmit={props.handleSubmit}
                        enableReinitialize
                >
                    {({ isSubmitting, setFieldValue, setFieldError, getFieldProps, handleChange, handleBlur, values }) =>
                    (<Form>
                        <div className={s.form}>

                            <div className={cl(s.section, s.status)}>
                                <label className={s.label}  htmlFor="academicDegree">Укажите Ваш текущий уровень обучения</label>
                                    <Field
                                        className={`${s.select} ${s.selectStatus}`}
                                        component="select"
                                        id="academicDegree"
                                        name="academicDegree"

                                        onChange={(e) => {
                                            setFieldValue('academicDegreeCourse', '1')
                                            setMinRegisterDate(e.target.value, '1') //Установка минимального срока оформления
                                            setMinDissertationDate(e.target.value, '1') //Установка минимального срока защиты кандидатской
                                            handleChange(e)
                                            setTimeout(() => {
                                                setFieldError('dateOfRegistration', '')
                                                setFieldError('dateOfDissertationDefense', '')
                                                setFieldValue('dateOfRegistration', format(getDateOfRegistration(e.target.value, '1'), 'yyyy-MM-dd'))
                                                setFieldValue('dateOfDissertationDefense', format(getDateOfDissertation(new Date(), e.target.value, '1', 15), 'yyyy-MM-dd'))
                                            }, 50);
                                        }}
                                        onBlur={(e) => {
                                        }}
                                    >
                                        <option value="Bachelor">Бакалавриат</option>
                                        <option value="Master">Магистратура</option>
                                        <option value="PreCandidate">Аспирантура</option>
                                        <option value="Specialist">Специалитет</option>
                                    </Field>
                                <label className={s.arrows} htmlFor="academicDegree"><img src={arrows} alt="arrows"/></label>
                            </div>

                            <div className={cl(s.section, s.register)}>
                                <label className={`${s.label} ${s.labelRight}`}  htmlFor="dateOfRegistration">Укажите дату оформления договора</label>
                                <Field
                                    id="dateOfRegistration"
                                    type="date"
                                    name="dateOfRegistration"
                                    component={DateInput}
                                    disabled={values.academicDegree === 'Specialist'}
                                />
                                <ErrorMessage name="dateOfRegistration" render={
                                    err => {
                                        return (
                                            <div className={s.error}>
                                                <TextError children={err} />
                                                <button className={s.defaultBtn} onClick={() => setFieldValue('dateOfRegistration', format(getDateOfRegistration(values.academicDegree, values.academicDegreeCourse), 'yyyy-MM-dd') )}>Вернуть по умолчанию</button>
                                            </div>
                                        )
                                    }
                                } />
                            </div>

                            <div className={cl(s.section, s.course)}>
                                <label className={s.label}  htmlFor="academicDegreeCourse">Укажите Ваш текущий учебный курс </label>
                                    <Field
                                        className={`${s.select} ${s.selectCourse}`}
                                        component="select"
                                        id="academicDegreeCourse"
                                        name="academicDegreeCourse"
                                        onChange={(e) => {
                                            setMinRegisterDate(values.academicDegree, e.target.value) //Установка минимального срока оформления
                                            setMinDissertationDate(values.academicDegree, e.target.value) //Установка минимального срока защиты кандидатской
                                            handleChange(e)
                                            setTimeout(() => {
                                                setFieldError('dateOfRegistration', '')
                                                setFieldError('dateOfDissertationDefense', '')
                                                setFieldValue('dateOfRegistration', format(getDateOfRegistration(values.academicDegree, e.target.value), 'yyyy-MM-dd'))
                                                setFieldValue('dateOfDissertationDefense', format(getDateOfDissertation(new Date(), values.academicDegree, e.target.value, 15), 'yyyy-MM-dd'))
                                            }, 50);
                                            }}
                                        onBlur={(e) => {
                                        }}
                                    >

                                        <option value="0">Поступаю</option>
                                        <option value="1">Курс 1</option>
                                        <option value="2">Курс 2</option>
                                        {
                                            (values.academicDegree === 'PreCandidate' ||  values.academicDegree === 'Bachelor')
                                            &&
                                                <>
                                                    <option value="3">Курс 3</option>
                                                    <option value="4">Курс 4</option>
                                                </>
                                        }
                                        {
                                            values.academicDegree === 'Specialist'
                                            &&
                                                <>
                                                    <option value="3">Курс 3</option>
                                                    <option value="4">Курс 4</option>
                                                    <option value="5">Курс 5</option>
                                                </>
                                        }
                                        <option value="6">Выпускник</option>
                                    </Field>
                                <label className={s.arrows} htmlFor="academicDegreeCourse"><img src={arrows} alt="arrows"/></label>

                            </div>

                            <div className={cl(s.section, s.birthday)}>
                                <label className={`${s.label} ${s.labelRight}`}  htmlFor="dateOfBirth">Укажите Вашу дату рождения</label>
                                <Field
                                    id="dateOfBirth"
                                    type="date"
                                    name="dateOfBirth"
                                    component={DateInput}
                                />
                                <ErrorMessage name="dateOfBirth" render={
                                    err => {
                                        return (
                                            <div className={s.error}>
                                                <TextError children={err} />
                                                <button className={s.defaultBtn} onClick={() => setFieldValue('dateOfBirth', format(new Date(2000, 0, 1), 'yyyy-MM-dd') )}>Вернуть по умолчанию</button>
                                            </div>
                                        )
                                    }
                                } />
                            </div>


                            <div className={cl(s.section, s.experience)}>
                                <label className={s.label}  htmlFor="workExperience">Опыт работы по должности ППС (мес)</label>
                                <Field
                                    id="workExperience"
                                    name="workExperience"
                                    type='number'
                                    component={NumberInput}
                                >
                                </Field>
                                <ErrorMessage name="workExperience" component={TextError} />
                            </div>

                            <div className={cl(s.section, s.dissertation)}>
                                <label className={`${s.label} ${s.labelRight}`} htmlFor="dateOfDissertationDefense">Дата защиты кандидатской диссертации </label>
                                <Field
                                    id="dateOfDissertationDefense"
                                    type="date"
                                    name="dateOfDissertationDefense"
                                    component={DateInput}
                                />
                                {/*<ErrorMessage name="dateOfDissertationDefense" component={TextError} />*/}
                                <ErrorMessage name="dateOfDissertationDefense" render={
                                    err => {
                                        return (
                                            <div className={s.error}>
                                                <TextError children={err} />
                                                <button className={s.defaultBtn} onClick={() => setFieldValue('dateOfDissertationDefense', format(getDateOfDissertation(new Date(), values.academicDegree, values.academicDegreeCourse, 15), 'yyyy-MM-dd') )}>Вернуть по умолчанию</button>
                                            </div>
                                        )
                                    }
                                } />
                            </div>
                        </div>

                        <button className={s.submitBtn} type="submit" disabled={isSubmitting}>Рассчитать</button>
                    </Form>
                    )}
                </Formik>
                {
                    props.salary.length > 0 &&
                    <Graphic isMobile={props.isMobile} isTablet={props.isTablet} salary={props.salary}/>
                }
            </div>
        </div>
    )
}

export default Salary
