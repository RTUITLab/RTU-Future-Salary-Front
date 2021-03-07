import React from "react";
import * as Yup from "yup";

export const withForm = (Component) => {

    class withForm extends React.Component {

        render() {
            const initialValues = {
                academicDegree: 'Master',
                academicDegreeCourse: '1',
                workExperience: '',
                dateOfBirth: '',
                dateOfRegistration: '',
                dateOfDissertationDefense: '',
            }

            let validationSchema = Yup.object({
                academicDegree: Yup.string()
                    .required('Пожалуйста, введите ученую степерь'),
                dateOfBirth: Yup.date()
                    .max('2004-01-01', 'Неправильная дата (max)')
                    .required('Пожалуйста, введите дату рождения'),
                dateOfRegistration: Yup.date()
                    .max('2021-01-01', 'Неправильная дата (max)')
                    .required('Пожалуйста, введите дату оформления'),
                dateOfDissertationDefense: Yup.date()
                    .max('2030-01-01', 'Неправильная дата (max)')
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
