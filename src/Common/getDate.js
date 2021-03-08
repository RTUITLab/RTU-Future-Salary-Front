export const getDateOfDissertation = (today, status, course) => {
    if(status === 'Master') {
        if(today.getMonth() < 8) {
            return new Date(today.getFullYear() + 6 - Math.floor(course), 8, 1)
        }
        else
            return new Date(today.getFullYear() + 7 - Math.floor(course), 8, 1)
    }
    else if (status === 'PreСandidate') {
        if(today.getMonth() < 8) {
            return new Date(today.getFullYear() + 4 - Math.floor(course), 8, 1)
        }
        else
            return new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1)
    }
    else {
        if(today.getMonth() < 8) {
            return new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1)
        }
        else
            return new Date(today.getFullYear() + 6 - Math.floor(course), 8, 1)
    }

}
