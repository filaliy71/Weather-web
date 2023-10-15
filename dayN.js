function getDayName(dateString) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];

}

const inputDate = "2023-10-15 12:00:00";
const dayName = getDayName(inputDate);
console.log(dayName);