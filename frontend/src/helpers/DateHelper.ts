export const Months = {
  January: { id: 1, name: "JanuaryShort" },
  February: { id: 2, name: "FebruaryShort" },
  March: { id: 3, name: "MarchShort" },
  April: { id: 4, name: "AprilShort" },
  May: { id: 5, name: "MayShort" },
  June: { id: 6, name: "JuneShort" },
  July: { id: 7, name: "JulyShort" },
  August: { id: 8, name: "AugustShort" },
  September: { id: 9, name: "SeptemberShort" },
  October: { id: 10, name: "OctoberShort" },
  November: { id: 11, name: "NovemberShort" },
  December: { id: 12, name: "DecemberShort" },
};

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
    year: date.getFullYear(),
  };
  let i: number;
  if ((i = dateStringArray.findIndex((ds) => ds.match(/\d+s/))) != -1) {
    dateObject.seconds += parseInt(dateStringArray[i].replace("s", ""));
  }
  if ((i = dateStringArray.findIndex((ds) => ds.match(/\d+min/))) != -1) {
    dateObject.minutes += parseInt(dateStringArray[i].replace("min", ""));
  }
  if ((i = dateStringArray.findIndex((ds) => ds.match(/\d+h/))) != -1) {
    dateObject.hours += parseInt(dateStringArray[i].replace("h", ""));
  }
  if ((i = dateStringArray.findIndex((ds) => ds.match(/\d+d/))) != -1) {
    dateObject.day += parseInt(dateStringArray[i].replace("d", ""));
  }
  if ((i = dateStringArray.findIndex((ds) => ds.match(/\d+w/))) != -1) {
    dateObject.day += parseInt(dateStringArray[i].replace("w", "")) * 7;
  }
  if ((i = dateStringArray.findIndex((ds) => ds.match(/\d+m/))) != -1) {
    dateObject.month += parseInt(dateStringArray[i].replace("m", ""));
  }
  if ((i = dateStringArray.findIndex((ds) => ds.match(/\d+y/))) != -1) {
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
};

export const formatDateTime = (value: string, translation: Function) => {
  if (!value) return "";
  const date = new Date(value);
  let day = date.getDate().toString();
  if (day.length != 2) {
    day = "0" + day;
  }
  let month = translation(
    Object.values(Months).find((m) => m.id == date.getMonth())?.name
  );
  let year = date.getFullYear();
  let hours = date.getHours().toString();
  if (hours.length != 2) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes().toString();
  if (minutes.length != 2) {
    minutes = "0" + minutes;
  }
  return `${day}. ${month}. ${year} ${hours}:${minutes}`;
};
