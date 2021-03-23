import React from "react";
import * as Yup from "yup";
import {format} from 'date-fns'
import {getDateOfDissertation} from "../Common/getDateOfDissertation";
import {getDateOfRegistration} from "../Common/getDateOfRegistration";

export const withForm = (Component) => {

    class withForm extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                minRegister: format(getDateOfRegistration('Master', '1'), 'yyyy-MM-dd'),
                minDissertation:format(getDateOfDissertation(new Date(), 'Master', '1', 15), 'yyyy-MM-dd'),
            }
        }

        render() {

            const setMinRegisterDate = (status, course) => {
                let today = new Date()
                if(status === 'Master') {
                    if(course === '1' || course === '6' || course === '2') { //Если выпускник или ещё учится
                        if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'yyyy-MM-dd')
                            })
                        }
                        else {
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                            })
                        }
                    }
                    else if(course === '0') { //Если поступает в магу, то только с 1 сен может оформиться
                        if (today.getMonth() < 8) {
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), 8, 1), 'yyyy-MM-dd')
                            })
                        }
                        else
                            this.setState({
                                minRegister: format(new Date(today.getFullYear() + 1, 8, 1), 'yyyy-MM-dd')
                            })
                    }
                }
                else if (status === 'PreCandidate') {
                    if(course === '0' || course === '6' || course === '1' || course === '2' || course === '3' || course === '4') { //Если выпускник или ещё учится
                        if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'yyyy-MM-dd')
                            })
                        }
                        else {
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                            })
                        }
                    }
                }
                else if (status === 'Bachelor') {
                    if(course !== '6') {
                        if(today.getMonth() < 8) { //Если он учится в бакалавриате или поступает, то расчитываем ему 1 сен, когда он поступит в магу
                            this.setState({
                                minRegister: format(new Date(today.getFullYear() + 4 - Math.floor(course), 8, 1), 'yyyy-MM-dd')
                            })
                        }
                        else
                            this.setState({
                                minRegister: format(new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1), 'yyyy-MM-dd')
                            })
                    }
                    else { //Если он выпускник бакалвриата, то расчитываем ему оформление 1 сен след уч года
                        if(today.getMonth() < 8) {
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), 8, 1), 'yyyy-MM-dd')
                            })
                        }
                        else
                            this.setState({
                                minRegister: format(new Date(today.getFullYear() + 1, 8, 1), 'yyyy-MM-dd')
                            })
                    }
                }
                else if (status === 'Specialist') {
                    if(course !== '6') {
                        if(today.getMonth() < 8) { //Если он учится в спец или поступает, то расчитываем ему 1 сен, когда он поступит в аспирантуру
                            this.setState({
                                minRegister: format(new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1), 'yyyy-MM-dd')
                            })
                        }
                        else
                            this.setState({
                                minRegister: format(new Date(today.getFullYear() + 6 - Math.floor(course), 8, 1), 'yyyy-MM-dd')
                            })
                    }
                    else { //Если он выпускник специалитета, то он может работать с 1 числа след месяца
                        if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), today.getMonth() + 1, 1), 'yyyy-MM-dd')
                            })
                        }
                        else {
                            this.setState({
                                minRegister: format(new Date(today.getFullYear(), today.getMonth(), 1), 'yyyy-MM-dd')
                            })
                        }
                    }
                }
            }

            const setMinDissertationDate = (status, course) => {
                this.setState({
                    minDissertation: format(getDateOfDissertation(new Date(), status, course, 1), 'yyyy-MM-dd'),
                })
                console.log(format(getDateOfDissertation(new Date(), status, course, 1), 'yyyy-MM-dd'))
            }
            let today = new Date()
            today = format(today.setDate(today.getDate() - 6573), 'yyyy-MM-dd') //18 лет
            let maxRegister = new Date()
            maxRegister = format(maxRegister.setDate(maxRegister.getDate() + 3652), 'yyyy-MM-dd') //10 лет
            let maxDissertation = new Date()
            maxDissertation = format(maxDissertation.setDate(maxDissertation.getDate() + 4748), 'yyyy-MM-dd') //13 лет

            const initialValues = {
                academicDegree: 'Master', //Статус в момент оформления
                academicDegreeCourse: '1', //Курс обучения
                workExperience: 0, //Стаж работы по должности ППС
                dateOfBirth: '2000-01-01', //Дата рождения
                dateOfRegistration: format(getDateOfRegistration('Master', '1'), 'yyyy-MM-dd'), //Дата оформления
                dateOfDissertationDefense:  format(getDateOfDissertation(new Date(), 'Master', '1', 15), 'yyyy-MM-dd'), //Дата защиты кандидатской диссертации
            }
            const setAcademicDegree = () => {
                initialValues.academicDegreeCourse = '1'
            }

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
                    .min(this.state.minRegister, 'Неверная дата оформления')
                    .max(maxRegister, 'Можно указывать максимум на 10 лет вперед')
                    .required('Пожалуйста, введите дату оформления'),
                dateOfDissertationDefense: Yup.date()
                    .min(this.state.minDissertation, 'Неверная дата защиты кандидатской')
                    .max(maxDissertation, 'Можно указывать максимум на 13 лет вперед')
                    .required('Пожалуйста, введите дату защиты кандидатской диссертации'),
            })
            return (
                <>
                    <Component {...this.props}
                               initialValues={initialValues}
                               setMinRegisterDate={setMinRegisterDate}
                               validationSchema={validationSchema}
                               setAcademicDegree={setAcademicDegree}
                               setMinDissertationDate={setMinDissertationDate}
                    />
                </>
            )
        }


    }

    return withForm;
}
