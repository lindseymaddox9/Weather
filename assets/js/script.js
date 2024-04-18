const apiKey = "7688aedded5c20ea0921f29c86a48422";
const submit = document.getElementById("submit");
const inputEl = document.getElementById("search").value;

function handleUserInput(event) {
  event.preventDefault();
  console.log("You clicked the button");
  //   gather the input content
  callCoord(inputEl);
  //getWeather(inputEl);
  //getForecast(inputEl)
}
//carrying it to the coordinates of the geo api
function callCoord(inputEl) {
  console.log(inputEl);
  const requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${inputEl}&limit=5&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("CURRENT WEATHER", data);
      // NEED TO EXTRACT THE FOLLOWING FROM DATA: CITY NAME, DATE (DT), WEATHER ICON, TEMPREATURE, HUMIDITY, WIND SPEED
      //let newData = {name:data.main.name, date:data.coord.dt,icon:data.weather.0.icon.50d,temperature:data.main.temperature,humidity:data.main.humidity,windspeed:data.wind.speed;
    });
}
//return response

// NEED TO CREATE THE FOLLOWING ELEMENTS USING JAVASCRIPT: H2 for the city name and date

//const H2 elements = ["Atlanta", "Denver", "Seattle","San Francisco", "Orlando", "New York", "Chicago", "Austin"];

// IMG ELEMENT: for icon

// var x = document.getElementById("myImg");
// P tags for temp, humidity, wind
//const p elements = ["temperature", "humidity", "wind speed"];

// ADD THE TEXT CONTENT TO THE NEWLY CREATED ELEMENTS

// APPEND THE ELEMENTS TO THE div with the ID of current
//     let div =document.createElement("")
// let p = document.createElement("p");
// div.append(p);

function getForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("FORECAST", data);
    });
}

submit.addEventListener("submit", handleUserInput);
