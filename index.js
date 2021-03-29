function createEmployeeRecord(info) {
  return {
    firstName: info[0],
    familyName: info[1],
    title: info[2],
    payPerHour: info[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(infoArray) {
  return infoArray.map((info) => createEmployeeRecord(info));
}

function createTimeInEvent(dateTime) {
  let [date, hour] = dateTime.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    date,
    hour: parseInt(hour),
  });
  return this;
}

function createTimeOutEvent(dateTime) {
  let [date, hour] = dateTime.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    date,
    hour: parseInt(hour),
  });
  return this;
}

function hoursWorkedOnDate(date) {
  let timeIn = this.timeInEvents.find((timeIn) => timeIn.date === date);
  let timeOut = this.timeOutEvents.find((timeOut) => timeOut.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  let dayHours = hoursWorkedOnDate.call(this, date);
  return dayHours * this.payPerHour;
}

function calculatePayroll(employeeRecords) {
  return employeeRecords
    .map((record) => allWagesFor.call(record))
    .reduce((a, b) => a + b);
}

function findEmployeeByFirstName(employeeRecords, name) {
  return employeeRecords.find((record) => record.firstName === name);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0,
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
