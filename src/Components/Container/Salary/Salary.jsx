import React from 'react'
import s from './Salary.module.scss'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import TextError from "../../../Common/TextError";
import Graphic from "../Graphic/Graphic";
import {format} from 'date-fns'
// import Test from "../../../Common/Test";
import {getDateOfDissertation} from "../../../Common/getDateOfDissertation";
import DateInput from "../../../Common/CustomInputs/Date/DateInput";
import NumberInput from "../../../Common/CustomInputs/Number/NumberInput";
import arrows from './../../../assets/images/arrows.svg'
import {getDateOfRegistration} from "../../../Common/getDateOfRegistration";

const Salary = (props) => {

    return (
        <div className={'outer'}>
            <div className={'container'}>
                <h1 className={s.title}>Калькулятор гарантированных выплат ППС</h1>
                <Formik initialValues={props.initialValues}
                        validationSchema={props.validationSchema}
                        onSubmit={props.handleSubmit}
                        enableReinitialize
                >
                    {({ isSubmitting, setFieldValue, getFieldProps, handleChange, handleBlur, values }) =>
                    (<Form>
                        <div className={s.form}>

                            <div className={s.section}>
                                <label className={s.label}  htmlFor="academicDegree">Укажите ваш текущий статус</label>
                                    <Field
                                        className={`${s.select} ${s.selectStatus}`}
                                        component="select"
                                        id="academicDegree"
                                        name="academicDegree"
                                        multiple={false}
                                        onChange={(e) => {
                                            let today = new Date()
                                            handleChange(e)
                                            setFieldValue('academicDegreeCourse', '1')
                                            if(e.target.value === 'Specialist') {
                                                setFieldValue('dateOfRegistration', format(getDateOfDissertation(today, 'Specialist_Registration', '1', 1), 'yyyy-MM-dd'))
                                            }
                                            setFieldValue('dateOfDissertationDefense', format(getDateOfDissertation(today, e.target.value, '1', 15), 'yyyy-MM-dd'))
                                            setFieldValue('dateOfRegistration', format(getDateOfRegistration(e.target.value, values.academicDegreeCourse), 'yyyy-MM-dd'))

                                            props.setMinRegisterDate(e.target.value, values.academicDegreeCourse) //Установка минимального срока оформления
                                        }}
                                    >
                                        <option value="Bachelor">Бакалавр</option>
                                        <option value="Master">Магистр</option>
                                        <option value="PreCandidate">Аспирант</option>
                                        <option value="Specialist">Специалист</option>
                                    </Field>
                                <label className={s.arrows} htmlFor="academicDegree"><img src={arrows} alt="arrows"/></label>
                            </div>

                            <div className={s.section}>
                                <label className={`${s.label} ${s.labelRight}`}  htmlFor="dateOfRegistration">Укажите дату оформления договора</label>
                                <Field
                                    id="dateOfRegistration"
                                    type="date"
                                    name="dateOfRegistration"
                                    component={DateInput}
                                    disabled={values.academicDegree === 'Specialist'}
                                />
                                <ErrorMessage name="dateOfRegistration" component={TextError} />
                            </div>

                            <div className={s.section}>
                                <label className={s.label}  htmlFor="academicDegreeCourse">Укажите Ваш текущий учебный курс </label>
                                    <Field
                                        className={`${s.select} ${s.selectCourse}`}
                                        component="select"
                                        id="academicDegreeCourse"
                                        name="academicDegreeCourse"
                                        onChange={(e) => {
                                            let today = new Date()
                                            handleChange(e)
                                            if(values.academicDegree === 'Specialist') {
                                                //Установка минимальной даты оформления для специалиста, который еще не выпускник
                                                setFieldValue('dateOfRegistration', format(getDateOfDissertation(today, 'Specialist_Registration', e.target.value, 1), 'yyyy-MM-dd'))
                                            }
                                            setFieldValue('dateOfDissertationDefense', format(getDateOfDissertation(today, values.academicDegree, e.target.value, 15), 'yyyy-MM-dd', ))
                                            setFieldValue('dateOfRegistration', format(getDateOfRegistration(values.academicDegree, e.target.value), 'yyyy-MM-dd'))

                                            props.setMinRegisterDate(values.academicDegree, e.target.value) //Установка минимального срока оформления
                                        }}
                                    >

                                        <option value="0">Поступлю</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        {
                                            (values.academicDegree === 'PreCandidate' ||  values.academicDegree === 'Bachelor')
                                            &&
                                                <>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </>
                                        }
                                        {
                                            values.academicDegree === 'Specialist'
                                            &&
                                                <>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </>
                                        }
                                        <option value="6">Выпускник</option>
                                    </Field>
                                <label className={s.arrows} htmlFor="academicDegreeCourse"><img src={arrows} alt="arrows"/></label>

                            </div>

                            <div className={s.section}>
                                <label className={`${s.label} ${s.labelRight}`}  htmlFor="dateOfBirth">Укажите Вашу дату рождения</label>
                                <Field
                                    id="dateOfBirth"
                                    type="date"
                                    name="dateOfBirth"
                                    component={DateInput}
                                />
                                <ErrorMessage name="dateOfBirth" component={TextError} />
                            </div>


                            <div className={s.section}>
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

                            <div className={s.section}>
                                <label className={`${s.label} ${s.labelRight}`} htmlFor="dateOfDissertationDefense">Дата защиты кандидатской диссертации </label>
                                <Field
                                    id="dateOfDissertationDefense"
                                    type="date"
                                    name="dateOfDissertationDefense"
                                    component={DateInput}
                                />
                                <ErrorMessage name="dateOfDissertationDefense" component={TextError} />
                            </div>
                        </div>

                        <button className={s.submitBtn} type="submit" disabled={isSubmitting}>Рассчитать</button>
                    </Form>
                    )}
                </Formik>
                {
                    props.salary.length > 0 &&
                    <Graphic salary={props.salary}/>
                }
            </div>
        </div>
    )
}

export default Salary
