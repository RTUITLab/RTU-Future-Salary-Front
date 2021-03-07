import React, {useState} from 'react'
import Salary from "./Salary/Salary";
import {withForm} from "../../hoc/withForm";

const Container = (props) => {

    const [academicDegree, setAcademicDegree] = useState('') //Ученая степень
    const [academicDegreeCourse, setAcademicDegreeCourse] = useState('') //Курс обучения
    const [workExperience, setWorkExperience] = useState('') //Стаж работы по должности ППС
    const [dateOfBirth, setDateOfBirth] = useState('') //Дата рождения
    const [dateOfRegistration, setDateOfRegistration] = useState('') //Дата оформления
    const [dateOfDissertationDefense, setDateOfDissertationDefense] = useState('') //Дата защиты кандидатской диссертации

    const handleSubmit = (values) => {
        debugger
    }

    return (
        <Salary {...props} handleSubmit={handleSubmit}
        />
    )

}

let withFormContainer = withForm(Container)
export default withFormContainer
