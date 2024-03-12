/* Your Code Here */
const createEmployeeRecord = function(employeeArr) {
    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

const createEmployeeRecords = function(employeesData) {
    return employeesData.map(function(employeeArr) {
        return createEmployeeRecord(employeeArr)
    });
}

const createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}
const createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

const hoursWorkedOnDate = function(dateWorked) {
    const timeIn = this.timeInEvents.find(event => event.date === dateWorked);
    const timeOut = this.timeOutEvents.find(event => event.date === dateWorked);
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = function(date) {  
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;

}

const allWagesFor = function() {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
}

const findEmployeeByFirstName = function(employeeArr, firstName) {
    return employeeArr.find(function(record){
        return record.firstName === firstName
    })
}

const calculatePayroll = function(recordsArr) {
    return recordsArr.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}