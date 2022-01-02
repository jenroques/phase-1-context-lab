/* Your Code Here */
const createEmployeeRecord = (recArray) => {
    return {
        firstName: recArray[0],
        familyName: recArray[1],
        title: recArray[2],
        payPerHour: recArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

const createEmployeeRecords = (recordsArray) => {
    return recordsArray.map(rec => createEmployeeRecord(rec))
}

let createTimeInEvent = function (datestamp) {
    let [date, hour] = datestamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

let createTimeOutEvent = function (datestamp) {
    let [date, hour] = datestamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return this
}

const hoursWorkedOnDate = function (targetDate) {
    const inEvent = this.timeInEvents.find(inEvent => inEvent.date === targetDate)
    const outEvent = this.timeOutEvents.find(outEvent => outEvent.date === targetDate)
    return (outEvent.hour - inEvent.hour) / 100
}

const wagesEarnedOnDate = function (targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName)
}

const calculatePayroll = function (recsArray) {
    return recsArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}
