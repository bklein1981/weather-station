//Open Weather API url and API key
var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
var apiKey = "0183fd03d05f07731ce37712f2c3840e";
// Set up the date/time variables
var currentDayEl = $("#currentDate");
var todaysDate = dayjs().format("dddd, MMMM D  hA");
currentDayEl.text(todaysDate);