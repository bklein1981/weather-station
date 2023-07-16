//Open Weather API url and API key
var requestURL = "https://api.openweathermap.org/data/2.5/weather";
var geoRequest = "https://api.openweathermap.org/geo/1.0/direct";
var fiveDayRequest = "https://api.openweathermap.org/data/2.5/forecast";
var apiKey = "0183fd03d05f07731ce37712f2c3840e";
//variables
var cityName;
var queryURL;
var geoUrl;
var fiveDayUrl;
var citySearch = [];

//DOM elements
var cityNameEl = $("#cityInput");
var citySearchBtnEL = $("#searchButton");
var recentSearchEL = $("#recentSearch");
var citylabelEL = $("#cityLabel");
var currentTempEL = $("#currentTemp");
var currentHumidityEL = $("#currentHumidity");
var currentWindSpeedEL = $("#currentWind");
var fiveDayTempBlockOneEL = $("#fiveDayBlockOne").children();
var fiveDayTempBlockTwoEL = $("#fiveDayBlockTwo").children();
var fiveDayTempBlockThreeEL = $("#fiveDayBlockThree").children();
var fiveDayTempBlockFourEL = $("#fiveDayBlockFour").children();
var fiveDayTempBlockFiveEL = $("#fiveDayBlockFive").children();
var cityListEL = $(".cityList");

// Set up the date/time variables for header
var currentDayEl = $("#currentDate");
var currentTempDateEL = $("#currentTempDate");
var todaysDate = dayjs();
currentDayEl.text(todaysDate.format("dddd, MMMM D  hA"));

//Search Button
$("#searchButton").on("click", function (event) {
  event.preventDefault();
  cityName = cityNameEl.val().trim();

  todaysForecast(cityName);
  extendedForecast(cityName);
  searchedCity(cityName);
  clearInput();
});

//Clears the input field
function clearInput() {
  cityNameEl.val("");
}

//Function to get today's forecast
function todaysForecast(cityWeWantToSearch) {
  queryURL = requestURL + "?q=" + cityWeWantToSearch + "&units=imperial&appid=" + apiKey;
  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        window.alert("Sorry, city not found");
        return;
      } else {
        return response.json();
      }
    })
    .then(function (data) {
      var icon =
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      citylabelEL.text(data.name + " " + todaysDate.format("(M/DD/YYYY) "));
      citylabelEL.append("<img src=" + icon + ">");
      currentTempEL.text(data.main.temp + " ℉");
      currentHumidityEL.text(data.main.humidity + " %");
      currentWindSpeedEL.text(data.wind.speed + " MPH");
    });
}

//function to get longitude and latitude
function extendedForecast(cityWeWantToSearch) {
  geoUrl = geoRequest + "?q=" + cityWeWantToSearch + "&appid=" + apiKey;
  fetch(geoUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var longitude = data[0].lon;
      var latitude = data[0].lat;
      fiveDay(latitude, longitude);
    });
}

// Five day forecast
function fiveDay(latitude, longitude) {
  lat = latitude;
  lon = longitude;
  fiveDayURL =
    fiveDayRequest +
    "?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&cnt=6&appid=" +
    apiKey;
  fetch(fiveDayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Next Day
      $(fiveDayTempBlockOneEL[0]).text(
        todaysDate.add(1, "Day").format("M/DD/YYYY")
      );
      $(fiveDayTempBlockOneEL[1]).html(
        "<img src=" +
          "http://openweathermap.org/img/w/" +
          data.list[1].weather[0].icon +
          ".png" +
          ">"
      );
      $(fiveDayTempBlockOneEL[2]).text(
        "Temp: " + data.list[1].main.temp + " ℉"
      );
      $(fiveDayTempBlockOneEL[3]).text(
        "Wind: " + data.list[1].wind.speed + " MPH"
      );
      $(fiveDayTempBlockOneEL[4]).text(
        "Humidity: " + data.list[1].main.humidity + " %"
      );

      //Second Day
      $(fiveDayTempBlockTwoEL[0]).text(
        todaysDate.add(2, "Day").format("M/DD/YYYY")
      );
      $(fiveDayTempBlockTwoEL[1]).html(
        "<img src=" +
          "http://openweathermap.org/img/w/" +
          data.list[2].weather[0].icon +
          ".png" +
          ">"
      );
      $(fiveDayTempBlockTwoEL[2]).text(
        "Temp: " + data.list[2].main.temp + " ℉"
      );
      $(fiveDayTempBlockTwoEL[3]).text(
        "Wind: " + data.list[2].wind.speed + " MPH"
      );
      $(fiveDayTempBlockTwoEL[4]).text(
        "Humidity: " + data.list[2].main.humidity + " %"
      );

      //Third Day
      $(fiveDayTempBlockThreeEL[0]).text(
        todaysDate.add(3, "Day").format("M/DD/YYYY")
      );
      $(fiveDayTempBlockThreeEL[1]).html(
        "<img src=" +
          "http://openweathermap.org/img/w/" +
          data.list[3].weather[0].icon +
          ".png" +
          ">"
      );
      $(fiveDayTempBlockThreeEL[2]).text(
        "Temp: " + data.list[3].main.temp + " ℉"
      );
      $(fiveDayTempBlockThreeEL[3]).text(
        "Wind: " + data.list[3].wind.speed + " MPH"
      );
      $(fiveDayTempBlockThreeEL[4]).text(
        "Humidity: " + data.list[3].main.humidity + " %"
      );

      //Fourth Day
      $(fiveDayTempBlockFourEL[0]).text(
        todaysDate.add(4, "Day").format("M/DD/YYYY")
      );
      $(fiveDayTempBlockFourEL[1]).html(
        "<img src=" +
          "http://openweathermap.org/img/w/" +
          data.list[4].weather[0].icon +
          ".png" +
          ">"
      );
      $(fiveDayTempBlockFourEL[2]).text(
        "Temp: " + data.list[4].main.temp + " ℉"
      );
      $(fiveDayTempBlockFourEL[3]).text(
        "Wind: " + data.list[4].wind.speed + " MPH"
      );
      $(fiveDayTempBlockFourEL[4]).text(
        "Humidity: " + data.list[4].main.humidity + " %"
      );

      //Fifth Day
      $(fiveDayTempBlockFiveEL[0]).text(
        todaysDate.add(5, "Day").format("M/DD/YYYY")
      );
      $(fiveDayTempBlockFiveEL[1]).html(
        "<img src=" +
          "http://openweathermap.org/img/w/" +
          data.list[5].weather[0].icon +
          ".png" +
          ">"
      );
      $(fiveDayTempBlockFiveEL[2]).text(
        "Temp: " + data.list[5].main.temp + " ℉"
      );
      $(fiveDayTempBlockFiveEL[3]).text(
        "Wind: " + data.list[5].wind.speed + " MPH"
      );
      $(fiveDayTempBlockFiveEL[4]).text(
        "Humidity: " + data.list[5].main.humidity + " %"
      );
    });
}

//function to push searched city to local storage
function searchedCity(cityName) {
  storedCitySearch = JSON.parse(localStorage.getItem("searchCityArray")) || [];
  storedCitySearch.push(cityName);
  localStorage.setItem("searchCityArray", JSON.stringify(storedCitySearch));
  renderSearchResults();

}

// function to render the search results
function renderSearchResults() {
  storedCitySearch = JSON.parse(localStorage.getItem("searchCityArray")) || []
  recentSearchEL.empty();
  for (var i = 0; i < storedCitySearch.length; i++) {
    var recentSearchDiv = document.createElement("div");
    recentSearchDiv.setAttribute("class", "cityList");
    recentSearchDiv.innerHTML = storedCitySearch[i];
    recentSearchDiv.addEventListener("click", function(event){

      todaysForecast(event.target.innerHTML);
      extendedForecast(event.target.innerHTML);
    })
    $(recentSearchEL).append(recentSearchDiv);
  }
}

//function for when page loads
function init() {
  renderSearchResults();
}

init()
