/**
 * Seconds: s
 * Minutes: min
 * Hours: h
 * Days: d
 * Weeks: w
 * Months: m
 * Years: y
 */
export const addDateStringToDate = (datestring: string, date: Date) => {
    const dateStringArray = datestring.split(" ");
    const dateObject = {
        seconds: date.getSeconds(), 
        minutes: date.getMinutes(), 
        hours: date.getHours(),
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    }
    let i: number;
    if ((i = dateStringArray.findIndex(ds => ds.match(/\d+s/))) != -1) {
        dateObject.seconds += parseInt(dateStringArray[i].replace("s", ""));
    }
    if ((i = dateStringArray.findIndex(ds => ds.match(/\d+min/))) != -1) {
        dateObject.minutes += parseInt(dateStringArray[i].replace("min", ""));
    }
    if ((i = dateStringArray.findIndex(ds => ds.match(/\d+h/))) != -1) {
        dateObject.hours += parseInt(dateStringArray[i].replace("h", ""));
    }
    if ((i = dateStringArray.findIndex(ds => ds.match(/\d+d/))) != -1) {
        dateObject.day += parseInt(dateStringArray[i].replace("d", ""));
    }
    if ((i = dateStringArray.findIndex(ds => ds.match(/\d+w/))) != -1) {
        dateObject.day += parseInt(dateStringArray[i].replace("w", "")) * 7;
    }
    if ((i = dateStringArray.findIndex(ds => ds.match(/\d+m/))) != -1) {
        dateObject.month += parseInt(dateStringArray[i].replace("m", ""));
    }
    if ((i = dateStringArray.findIndex(ds => ds.match(/\d+y/))) != -1) {
        dateObject.year += parseInt(dateStringArray[i].replace("y", ""));
    }
    return new Date(
        dateObject.year, 
        dateObject.month, 
        dateObject.day, 
        dateObject.hours, 
        dateObject.minutes, 
        dateObject.seconds
    );
}