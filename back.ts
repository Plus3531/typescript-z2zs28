const formatDateTime = (date) => {
  let day = date.getDate(),
    month = date.getMonth() + 1,
    year = date.getFullYear(),
    hour = date.getHours(),
    min = date.getMinutes();

  month = (month < 10 ? '0' : '') + month;
  day = (day < 10 ? '0' : '') + day;
  hour = (hour < 10 ? '0' : '') + hour;
  min = (min < 10 ? '0' : '') + min;

  const ymd = year + '-' + month + '-' + day,
    displayTime = hour + ':' + min;
  return { ymd, displayTime };
};

const dateTimeFromString = (timeStr, dateStr) => {
  const [year, month, day] = dateStr.split('-');
  const [hours, minutes] = timeStr.split(':');
  return new Date(year, month, day, hours, minutes, 0);
};
const theDate = new Date();