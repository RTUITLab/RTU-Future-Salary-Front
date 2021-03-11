import React from 'react'
// import s from './Salary.module.scss'
import { Formik, Form, Field, ErrorMessage} from 'formik'
import TextError from "../../../Common/TextError";
import Graphic from "../Graphic/Graphic";
import {format} from 'date-fns'
// import Test from "../../../Common/Test";
import {getDateOfDissertation} from "../../../Common/getDate";
import DateInput from "../../../Common/CustomInputs/Date/DateInput";

const Salary = (props) => {

    return (
        <div className={'outer'}>
            <div className={'container'}>
                <Formik initialValues={props.initialValues}
                        validationSchema={props.validationSchema}
                        onSubmit={props.handleSubmit}
                        enableReinitialize
                >
                    {({ isSubmitting, setFieldValue, getFieldProps, handleChange, handleBlur, values }) =>
                    (<Form>
                        <div>
                            <label htmlFor="academicDegree">Статус в момент оформления</label>
                                <Field
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
                                    }}
                                >
                                    <option value="Master">Магистр</option>
                                    <option value="PreCandidate">Аспирант</option>
                                    <option value="Specialist">Специалист</option>
                                </Field>
                        </div>

                        <div>
                            <label htmlFor="academicDegreeCourse">Текущий курс</label>
                                <Field
                                    component="select"
                                    id="academicDegreeCourse"
                                    name="academicDegreeCourse"
                                    onChange={(e) => {
                                        let today = new Date()
                                        handleChange(e)
                                        if(values.academicDegree === 'Specialist') {
                                            setFieldValue('dateOfRegistration', format(getDateOfDissertation(today, 'Specialist_Registration', e.target.value, 1), 'yyyy-MM-dd'))
                                        }
                                        setFieldValue('dateOfDissertationDefense', format(getDateOfDissertation(today, values.academicDegree, e.target.value, 15), 'yyyy-MM-dd', ))
                                    }}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    {
                                        values.academicDegree === 'PreCandidate'
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
                                </Field>
                        </div>

                        <div>
                            <label htmlFor="workExperience">Опыт работы по должности ППС (мес)</label>
                            <Field
                                id="workExperience"
                                name="workExperience"
                                type='number'
                            >
                            </Field>
                            <ErrorMessage name="workExperience" component={TextError} />
                        </div>

                        <div>
                            <label htmlFor="dateOfBirth">Дата рождения</label>
                            <Field
                                id="dateOfBirth"
                                type="date"
                                name="dateOfBirth"
                                component={DateInput}
                            />
                            <ErrorMessage name="dateOfBirth" component={TextError} />
                        </div>


                        <div>
                            <label htmlFor="dateOfRegistration">Дата оформления</label>
                            <Field
                                id="dateOfRegistration"
                                type="date"
                                name="dateOfRegistration"
                                component={DateInput}
                                disabled={values.academicDegree === 'Specialist'}
                            />
                            <ErrorMessage name="dateOfRegistration" component={TextError} />
                        </div>


                        <div>
                            <label htmlFor="dateOfDissertationDefense">Предположительная дата защиты кандидатской диссертации</label>
                            <Field
                                id="dateOfDissertationDefense"
                                type="date"
                                name="dateOfDissertationDefense"
                                disabled
                                // component={Test}
                            />
                            <ErrorMessage name="dateOfDissertationDefense" component={TextError} />
                        </div>

                        <button type="submit" disabled={isSubmitting}>Рассчитать</button>
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
