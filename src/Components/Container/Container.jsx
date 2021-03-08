import React, {useState} from 'react'
import Salary from "./Salary/Salary";
import {withForm} from "../../hoc/withForm";
import axios from "axios";

const Container = (props) => {

    const [salary, setSalary] = useState('')

    const apiRequest = (values) => {
        let formdata = new FormData();

        formdata.append('academic_degree', values.academicDegree)
        formdata.append('academic_degree_course', values.academicDegreeCourse)
        formdata.append('work_experience', values.workExperience)
        formdata.append('date_of_birth', values.dateOfBirth)
        formdata.append('date_of_registration', values.dateOfRegistration)
        formdata.append('date_of_dissertation_defense', values.dateOfDissertationDefense)

        return axios.post(`http://127.0.0.1:8000/api/calculate`, formdata)
    }

    const handleSubmit = async (values) => {

        console.log(values)

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
        <Salary {...props} salary={salary} handleSubmit={handleSubmit}
        />
    )

}

let withFormContainer = withForm(Container)
export default withFormContainer
