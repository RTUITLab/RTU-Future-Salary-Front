import React from "react";
import * as Yup from "yup";

export const withForm = (Component) => {

    class withForm extends React.Component {

        render() {
            const initialValues = {
               academicDegree: 'PreСandidate',
                academicDegreeCourse: '',
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
