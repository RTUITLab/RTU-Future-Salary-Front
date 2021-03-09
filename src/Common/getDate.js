export const getDateOfDissertation = (today, status, course, day) => {

    if(status === 'Master') {
        if(today.getMonth() < 8) {
            return new Date(today.getFullYear() + 6 - Math.floor(course), 8, day)
        }
        else
            return new Date(today.getFullYear() + 7 - Math.floor(course), 8, day)
    }
    else if (status === 'PreCandidate') {
        if(today.getMonth() < 8) {
            return new Date(today.getFullYear() + 4 - Math.floor(course), 8, day)
        }
        else
            return new Date(today.getFullYear() + 5 - Math.floor(course), 8, day)
    }
    else {
        if(today.getMonth() < 8) {
            return new Date(today.getFullYear() + 5 - Math.floor(course), 8, day)
        }
        else
            return new Date(today.getFullYear() + 6 - Math.floor(course), 8, day)
    }

}
