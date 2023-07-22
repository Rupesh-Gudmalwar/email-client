export const formatDate = (dateObj) => {
  const date = dateObj?.getDate();
  let month = dateObj?.getMonth() + 1;
  const year = dateObj?.getFullYear();

  month = month < 10 ? "0" + month : month;

  const dateString = date + "/" + month + "/" + year;
  return dateString;
};

export const timeFormat = (dateObj) => {
  let hours = dateObj?.getHours();
  let minutes = dateObj?.getMinutes();

  hours = hours % 12;
  hours = hours ? hours : 12;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const amPm = hours >= 12 ? "pm" : "am";

  const timeString = hours + ":" + minutes + amPm;

  return timeString;
};
