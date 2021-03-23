import React from "react";
import * as Yup from "yup";
import {format} from 'date-fns'
import {getDateOfDissertation} from "../Common/getDateOfDissertation";

export const withForm = (Component) => {

    class withForm extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                minRegister: format(new Date(), 'yyyy-MM-dd') //Сегодняшний день
            }
        }

        render() {

            const setMinRegisterDate = (status, course) => {
                let now = new Date()
                if (status === 'Master') {
                    if(course === '6' || course === '1' || course === '2') { //Выпускник или ещё учится
                        let day = now.getDate()
                        if(day !== 1) {
                            this.setState({
                                minRegister: format(new Date(now.getFullYear(), now.getMonth() + 1, 1), 'yyyy-MM-dd')
                            })
                        }
                        else {
                            this.setState({
                                minRegister: format(new Date(now.getFullYear(), now.getMonth(), 1), 'yyyy-MM-dd')
                            })
                        }
                    }
                    else {
                        if(now.getMonth() < 8) {
                            this.setState({
                                minRegister: format(new Date(now.getFullYear(), 8, 1), 'yyyy-MM-dd')
                            })
                        }
                        else
                            this.setState({
                                minRegister: format(new Date(now.getFullYear() + 1, 8, 1), 'yyyy-MM-dd')
                            })
                    }
                }
            }

            let dissertation = new Date()
            dissertation = format(getDateOfDissertation(dissertation, 'Master', '1', 15), 'yyyy-MM-dd')
            let today = new Date()
            let maxRegister = new Date()
            maxRegister = format(maxRegister.setDate(maxRegister.getDate() + 3652), 'yyyy-MM-dd') //10 лет
            today = format(today.setDate(today.getDate() - 6573), 'yyyy-MM-dd') //18 лет

            const initialValues = {
                academicDegree: 'Master', //Статус в момент оформления
                academicDegreeCourse: '1', //Курс обучения
                workExperience: 0, //Стаж работы по должности ППС
                dateOfBirth: '2000-01-01', //Дата рождения
                dateOfRegistration: format(new Date(), 'yyyy-MM-dd'), //Дата оформления
                dateOfDissertationDefense: dissertation, //Дата защиты кандидатской диссертации
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
                    .required('Пожалуйста, введите дату защиты кандидатской диссертации'),
            })
            return (
                <>
                    <Component {...this.props}
                               initialValues={initialValues}
                               setMinRegisterDate={setMinRegisterDate}
                               validationSchema={validationSchema}
                               setAcademicDegree={setAcademicDegree}
                    />
                </>
            )
        }


    }

    return withForm;
}
