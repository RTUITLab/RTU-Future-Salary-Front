export const getDateOfDissertation = (today, status, course, day) => {

    if(status === 'Master') {
        if(course !== '6') {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear() + 6 - Math.floor(course), 8, day)
            }
            else
                return new Date(today.getFullYear() + 7 - Math.floor(course), 8, day)
        }
        else {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear() + 4, 8, day)
            }
            else
                return new Date(today.getFullYear() + 5, 8, day)
        }
    }
    else if (status === 'Bachelor') {
        if(course !== '6') {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear() + 10 - Math.floor(course), 8, day)
            }
            else
                return new Date(today.getFullYear() + 11 - Math.floor(course), 8, day)
        }
        else {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear() + 6, 8, day)
            }
            else
                return new Date(today.getFullYear() + 7, 8, day)
        }
    }
    else if (status === 'PreCandidate') {
        if(course !== '6') {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear() + 4 - Math.floor(course), 8, day)
            }
            else
                return new Date(today.getFullYear() + 5 - Math.floor(course), 8, day)
        }
        else {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear(), 8, day)
            }
            else
                return new Date(today.getFullYear() + 1, 8, day)
        }
    }
    // else if (status === 'Specialist_Registration') {
    //     if(today.getMonth() < 8) {
    //         return new Date(today.getFullYear() + 5 - Math.floor(course), 8, day)
    //     }
    //     else
    //         return new Date(today.getFullYear() + 6 - Math.floor(course), 8, day)
    // }
    else {
        if(course !== '6') {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear() + 9 - Math.floor(course), 8, day)
            }
            else
                return new Date(today.getFullYear() + 10 - Math.floor(course), 8, day)
        }
        else {
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear() + 4 - Math.floor(course), 8, day)
            }
            else
                return new Date(today.getFullYear() + 5 - Math.floor(course), 8, day)
        }
    }

}
