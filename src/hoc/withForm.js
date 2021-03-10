import React from "react";
import * as Yup from "yup";
import {format} from 'date-fns'
import {getDateOfDissertation} from "../Common/getDate";

export const withForm = (Component) => {

    class withForm extends React.Component {

        render() {

            let dissertation = new Date()
            dissertation = format(getDateOfDissertation(dissertation, 'Master', '1', 15), 'yyyy-MM-dd')

            let today = new Date()

            let minRegister = new Date()
            minRegister = format(minRegister, 'yyyy-MM-dd')
            today = format(today.setDate(today.getDate() - 6573), 'yyyy-MM-dd') //18 лет

            const initialValues = {
                academicDegree: 'Master', //Статус в момент оформления
                academicDegreeCourse: '1', //Курс обучения
                workExperience: 0, //Стаж работы по должности ППС
                dateOfBirth: '2002-01-01', //Дата рождения
                dateOfRegistration: minRegister, //Дата оформления
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
                    .max(120, 'Максимум 10 лет')
                    .required('Пожалуйста, введите опыт работы'),
                dateOfBirth: Yup.date()
                    //Брать текущую дату - 18 лет
                    .max(today, 'Минимум 18 лет')
                    .min('1921-01-01', 'Максимум 100 лет')
                    .required('Пожалуйста, введите дату рождения'),
                dateOfRegistration: Yup.date()
                    // .max('2022-01-01', 'Неправильная дата (max)')
                    .min(minRegister, 'Оформление возможно только с сегодняшнего дня')
                    .required('Пожалуйста, введите дату оформления'),
                dateOfDissertationDefense: Yup.date()
                    // .max('2030-01-01', 'Неправильная дата (max)')
                    .required('Пожалуйста, введите дату защиты кандидатской диссертации'),
            })
            return (
                <>
                    <Component {...this.props}
                               initialValues={initialValues}
                               validationSchema={validationSchema}
                               setAcademicDegree={setAcademicDegree}
                    />
                </>
            )
        }


    }

    return withForm;
}
