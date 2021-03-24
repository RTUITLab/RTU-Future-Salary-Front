import React from "react";
// import * as Yup from "yup";
import {format} from 'date-fns'
import {getDateOfDissertation} from "../../Common/getDateOfDissertation";
import {getDateOfRegistration} from "../../Common/getDateOfRegistration";
import Container from "./Container";

const StateForm = (props) => {

        const initialValues = {
            academicDegree: 'Master', //Статус в момент оформления
            academicDegreeCourse: '1', //Курс обучения
            workExperience: 0, //Стаж работы по должности ППС
            dateOfBirth: '2000-01-01', //Дата рождения
            dateOfRegistration: format(getDateOfRegistration('Master', '1'), 'yyyy-MM-dd'), //Дата оформления
            dateOfDissertationDefense:  format(getDateOfDissertation(new Date(), 'Master', '1', 15), 'yyyy-MM-dd'), //Дата защиты кандидатской диссертации
        }
        return (
            <>
                <Container {...props}
                           // minDissertation={minDissertation}
                           initialValues={initialValues}
                           // setMinRegisterDate={setMinRegisterDate}
                           // validationSchema={validationSchema}
                           // setMinDissertationDate={setMinDissertationDate}
                />
            </>
        )
}
export default StateForm
