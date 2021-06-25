import React, {useState} from 'react'
import Salary from "./Salary/Salary";
import axios from "axios";
import {isMobile, isTablet} from 'react-device-detect';

const Container = (props) => {

    const [salary, setSalary] = useState('')

    const apiRequest = (values) => {
        let formdata = new FormData();
        formdata.append('academic_status', values.academicDegree)
        formdata.append('academic_course', values.academicDegreeCourse)
        formdata.append('work_experience', values.workExperience)
        formdata.append('date_of_birth', values.dateOfBirth)
        formdata.append('date_of_registration', values.dateOfRegistration)
        formdata.append('date_of_dissertation', values.dateOfDissertationDefense)

        let baseUrl = process.env.REACT_APP_PRODUCTION_URL
        if(baseUrl === undefined) {
            window.alert('Не удалось получить доступ к переменной окружения REACT_APP_PRODUCTION_URL')
        }
        else {
            return axios.post(`${baseUrl}api/calculate`, formdata)
        }
    }

    const handleSubmit = async (values) => {
        try {
            let response = await apiRequest(values)
            if(response.status === 200 && !response.data.status) {
                setSalary(response.data)
            }
            else {
                throw new Error()
            }
        }
        catch (error) {
            // console.log('Error', error.toJSON())
            window.alert('Ошибка получения графика выплат')
        }
    }
    return (
        <Salary isMobile={isMobile} isTablet={isTablet} {...props} salary={salary} handleSubmit={handleSubmit} />
    )

}

export default Container
