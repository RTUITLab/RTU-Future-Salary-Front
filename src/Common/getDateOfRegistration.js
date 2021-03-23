export const getDateOfRegistration = (status, course) => {
    let today = new Date()

    if(status === 'Master') {
        if(course === '1' || course === '2') { //Если выпускник или ещё учится
            if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                return new Date(today.getFullYear(), today.getMonth() + 1, 1)
            }
            else {
                return new Date(today.getFullYear(), today.getMonth(), 1)
            }
        }
        else if(course === '6' || course === '0') { //Если выпускник маги, то дату ставим 1 сен, с возможностью оформиться раньше
            if (today.getMonth() < 8) {
                return new Date(today.getFullYear(), 8, 1)
            }
            else
                return new Date(today.getFullYear() + 1, 8, 1)
        }
    }

    else if (status === 'PreCandidate') {
        if(course === '6' || course === '1' || course === '2' || course === '3' || course === '4') { //Если выпускник или ещё учится
            if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                return new Date(today.getFullYear(), today.getMonth() + 1, 1)
            }
            else {
                return new Date(today.getFullYear(), today.getMonth(), 1)
            }
        }
        else { //Если он поступает в аспирантуру, то он окончил спец или магу и может работать со след месяца
            if (today.getMonth() < 8) {
                return new Date(today.getFullYear(), 8, 1)
            }
            else
                return new Date(today.getFullYear() + 1, 8, 1)
        }
    }

    else if (status === 'Bachelor') {
        if(course !== '6') {
            if(today.getMonth() < 8) { //Если он учится в бакалавриате или поступает, то расчитываем ему 1 сен, когда он поступит в магу
                return new Date(today.getFullYear() + 4 - Math.floor(course), 8, 1)
            }
            else
                return new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1)
        }
        else { //Если он выпускник бакалвриата, то расчитываем ему оформление 1 сен след уч года
            if(today.getMonth() < 8) {
                return new Date(today.getFullYear(), 8, 1)
            }
            else
                return new Date(today.getFullYear() + 1, 8, 1)
        }
    }
    else if (status === 'Specialist') {
        if(course !== '6') {
            if(today.getMonth() < 8) { //Если он учится в спец или поступает, то расчитываем ему 1 сен, когда он поступит в аспирантуру
                return new Date(today.getFullYear() + 5 - Math.floor(course), 8, 1)
            }
            else
                return new Date(today.getFullYear() + 6 - Math.floor(course), 8, 1)
        }
        else { //Если он выпускник специалитета, то он может работать с 1 числа след месяца
            if(today.getDate() !== 1) { //Если сегодня не первое число, то на следующий месяц первого
                return new Date(today.getFullYear(), today.getMonth() + 1, 1)
            }
            else {
                return new Date(today.getFullYear(), today.getMonth(), 1)
            }
        }
    }
}
