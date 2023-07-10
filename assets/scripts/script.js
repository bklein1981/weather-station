//Open Weather API url and API key
var requestURL = "https://api.openweathermap.org/data/2.5/weather";
var geoRequest = "https://api.openweathermap.org/geo/1.0/direct";
var apiKey = "0183fd03d05f07731ce37712f2c3840e";

//variables
var cityName;
var queryURL;
var geoUrl;
var coordinates = [];

//DOM elements
var cityNameEl = $("#cityInput");
var citySearchBtnEL = $("searchButton");
var recentSearchEL = $("#recentSearch");
var citylabelEL = $("#cityLabel");
var currentTempEL = $("#currentTemp");
var currentHumidityEL = $("#currentHumidity");
var currentWindSpeedEL = $("#currentWind");

// Set up the date/time variables for header
var currentDayEl = $("#currentDate");
var currentTempDateEL = $("#currentTempDate")
var todaysDate = dayjs();
currentDayEl.text(todaysDate.format("dddd, MMMM D  hA"));

//Search Button
$("#searchButton").on("click", function (event) {
cityName = cityNameEl.val().trim();
queryURL = requestURL + "?q=" + cityName + "&units=imperial&appid=" + apiKey;
geoUrl = geoRequest + "?q=" + cityName + "&appid=" + apiKey
todaysForecast(queryURL);
geoLocation(geoUrl);

longitude = coordinates[0];
latitude = coordinates[1];

console.log(longitude);
console.log(latitude);

clearInput();

});

//Clears the input field
function clearInput() {
    cityNameEl.val("");
}

//Function to get today's forecast
function todaysForecast(queryURL) {
    fetch(queryURL)
    .then(function (response) {
        if (!response.ok) {
            window.alert("Sorry, city not found");
            return;
        }
        else {return response.json();}
    })
    .then(function (data) {
        var icon = "http://openweathermap.org/img/w/"+ data.weather[0].icon + ".png"
        citylabelEL.text(data.name + " " + todaysDate.format("(M/DD/YYYY) "));
        citylabelEL.append("<img src=" + icon + ">");
        currentTempEL.text(data.main.temp + " ℉");
        currentHumidityEL.text(data.main.humidity + " %"); ;
        currentWindSpeedEL.text(data.wind.speed + " MPH");
    });
};

//function to get longitude and latitude
function geoLocation(geoUrl) {
    fetch(geoUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        lon = data[0].lon;
        lat = data[0].lat;
        
        coordinates = [lon, lat];
        console.log(coordinates);
        return coordinates;
    });
}
