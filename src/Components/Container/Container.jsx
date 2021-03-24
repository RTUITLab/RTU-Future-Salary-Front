import React, {useState} from 'react'
import Salary from "./Salary/Salary";
import axios from "axios";

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

        let baseUrl= ''

        let debug = true

        if(debug) {
            baseUrl = "http://127.0.0.1:8000/"
        }
        else {
            baseUrl = process.env.REACT_APP_PRODUCTION_URL
        }

        return axios.post(`${baseUrl}api/calculate`, formdata)
    }

    const handleSubmit = async (values) => {
        try {
            let response = await apiRequest(values)
            console.log(response.data)
            setSalary(response.data)
        }
        catch (error) {
            console.log('Error', error.toJSON())
            window.alert('Error')
        }
    }
    return (
        <Salary {...props} salary={salary} handleSubmit={handleSubmit} />
    )

}

export default Container
