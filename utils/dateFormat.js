const addDateSuffix = (date) => {
  let dateStr = date.toString();

  // Creates a new variable to hold the last character of the date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  // Series of condtional statements that will check the last character of the date string 
  // to determine if a suffix needs to be added and then adds it to the date string as needed
  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

// Function that will format the timestamp to display the date, month, year, and time of day
module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  // Creates an object to hold the months of the year with the key being the month number 
  // with 0 being January and 11 being December
  const months = {
    0: monthLength === 'short' ? 'Jan' : 'January',
    1: monthLength === 'short' ? 'Feb' : 'February',
    2: monthLength === 'short' ? 'Mar' : 'March',
    3: monthLength === 'short' ? 'Apr' : 'April',
    4: monthLength === 'short' ? 'May' : 'May',
    5: monthLength === 'short' ? 'Jun' : 'June',
    6: monthLength === 'short' ? 'Jul' : 'July',
    7: monthLength === 'short' ? 'Aug' : 'August',
    8: monthLength === 'short' ? 'Sep' : 'September',
    9: monthLength === 'short' ? 'Oct' : 'October',
    10: monthLength === 'short' ? 'Nov' : 'November',
    11: monthLength === 'short' ? 'Dec' : 'December',
  };

  // Creates a new Date object based on the timestamp passed in
  const dateObject = new Date(timestamp);
  const formattedMonth = months[dateObject.getMonth()];

  // Calls the addDateSuffix function to add a suffix to the date if needed
  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObject.getDate())
    : dateObject.getDate();

  // Creates a variable to hold the year of the date object
  const year = dateObject.getFullYear();
  // Creates a variable to hold the hour of the date object and converts it from 24 hour time to 12 hour time
  let hour =
    dateObject.getHours() > 12
      ? Math.floor(dateObject.getHours() - 12)
      : dateObject.getHours();

  // Conditional statement that will set the hour to 12 if the hour is 0 i.e Midnight
  if (hour === 0) {
    hour = 12;
  }

  // Creates a variable to hold the minutes of the date object and adds a 0 to the front if the minutes are less than 10
  const minutes = (dateObject.getMinutes() < 10 ? '0' : '') + dateObject.getMinutes();

  // Creates a variable to hold the period of the day i.e am or pm
  const periodOfDay = dateObject.getHours() >= 12 ? 'pm' : 'am';

  // Creates a variable to hold the fully formatted timestamp
  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
