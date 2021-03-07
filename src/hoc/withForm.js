import React from "react";
import * as Yup from "yup";

export const withForm = (Component) => {

    class withForm extends React.Component {

        render() {
            const initialValues = {
                academicDegree: 'Master', //Ученая степень
                academicDegreeCourse: '1', //Курс обучения
                workExperience: 0, //Стаж работы по должности ППС
                dateOfBirth: '2002-01-01', //Дата рождения
                dateOfRegistration: '2021-09-01', //Дата оформления
                dateOfDissertationDefense: '2027-09-15', //Дата защиты кандидатской диссертации
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
                    .max('2004-01-01', 'Неправильная дата (max)')
                    .min('1921-01-01', 'Максимум 100 лет')
                    .required('Пожалуйста, введите дату рождения'),
                dateOfRegistration: Yup.date()
                    .max('2022-01-01', 'Неправильная дата (max)')
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
                    />
                </>
            )
        }


    }

    return withForm;
}
