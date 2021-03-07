import React from 'react'
import s from './Salary.module.scss'
import { Formik, Form, Field, ErrorMessage, FieldArray} from 'formik'
import TextError from "../../../Common/TextError";
import Test from "../../Test";


const Salary = (props) => {
    return (
        <div className={'outer'}>
            <div className={'container'}>
                <Formik initialValues={props.initialValues}
                        validationSchema={props.validationSchema}
                        onSubmit={props.handleSubmit}
                        enableReinitialize
                >
                    {({ isSubmitting, getFieldProps, handleChange, handleBlur, values }) =>
                    (<Form>
                        <div>
                            <label htmlFor="academicDegree">Ученая степень</label>
                                <Field
                                    component="select"
                                    id="academicDegree"
                                    name="academicDegree"
                                    multiple={false}
                                >
                                    <option value="Master">Магистр</option>
                                    <option value="PreСandidate">Аспирант</option>
                                </Field>
                        </div>

                        <div>
                            <label htmlFor="academicDegreeCourse">Текущий курс</label>
                                <Field
                                    component="select"
                                    id="academicDegreeCourse"
                                    name="academicDegreeCourse"
                                    multiple={false}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    {
                                        values.academicDegree === 'PreСandidate'
                                        &&
                                            <>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </>
                                    }
                                </Field>
                        </div>

                        <div>
                            <label htmlFor="workExperience">Опыт работы по должности ППС</label>
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
                            />
                            <ErrorMessage name="dateOfBirth" component={TextError} />
                        </div>

                        <div>
                            <label htmlFor="dateOfRegistration">Дата оформления</label>
                            <Field
                                id="dateOfRegistration"
                                type="date"
                                name="dateOfRegistration"
                            />
                            <ErrorMessage name="dateOfRegistration" component={TextError} />
                        </div>

                        <div>
                            <label htmlFor="dateOfDissertationDefense">Дата защиты кандидатской диссертации</label>
                            <Field
                                id="dateOfDissertationDefense"
                                type="date"
                                name="dateOfDissertationDefense"
                                // component={Test}
                            />
                            <ErrorMessage name="dateOfDissertationDefense" component={TextError} />
                        </div>

                        <button type="submit" disabled={isSubmitting}>Рассчитать</button>
                    </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default Salary
