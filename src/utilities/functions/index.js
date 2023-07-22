export const formatDate = (dateObj) => {
  const newDate = new Date(dateObj);
  const date = newDate?.getDate();
  let month = newDate?.getMonth() + 1;
  const year = newDate?.getFullYear();

  month = month < 10 ? "0" + month : month;

  const dateString = date + "/" + month + "/" + year;
  return dateString;
};

export const timeFormat = (dateObj) => {
  const newDate = new Date(dateObj);
  let hours = newDate?.getHours();
  let minutes = newDate?.getMinutes();

  hours = hours % 12;
  hours = hours ? hours : 12;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const amPm = hours >= 12 ? "pm" : "am";

  const timeString = hours + ":" + minutes + amPm;

  return timeString;
};
