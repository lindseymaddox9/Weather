const apiKey = "7688aedded5c20ea0921f29c86a48422";
const submit = document.getElementById("form");
const currentDiv = document.getElementById("current");

function handleUserInput(event) {
  event.preventDefault();
  const inputEl = document.getElementById("search").value;
  //   gather the input content Template literals ${}
  getWeather(inputEl);
  getForecast(inputEl);
}

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log("CURRENT WEATHER", data);

      
      // NEED TO EXTRACT THE FOLLOWING FROM DATA: CITY NAME, DATE (DT), WEATHER ICON, TEMPREATURE, HUMIDITY, WIND SPEED
      //let newData = {name:data.name, date:data.dt,icon:data.weather[0].icon,temperature:data.main.temperature,humidity:data.main.humidity,windspeed:data.wind.speed;
      // NEED TO CREATE THE FOLLOWING ELEMENTS USING JAVASCRIPT: H2 for the city name and date
      var date = new Date(data.dt * 1000).toLocaleDateString()
      console.log(date);
      
      const cityName = document.createElement("h2");
      const temperature = document.createElement("p");
      const humidity = document.createElement("p");
      const wind = document.createElement("p");
      const image = document.createElement("img")

      cityName.textContent = data.name + ' ' + date;
      temperature.textContent = data.main.temp;
      humidity.textContent = data.main.humidity;
      wind.textContent = data.wind.speed;
      image.setAttribute('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")

      currentDiv.append(cityName, image, temperature, humidity,wind);

     
    });
}
//return response

function getForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("FORECAST", data.list);
      for (let i = 3; i < data.list.length; i += 8) {
        const element = data.list[i];
        console.log(element);
        // create a div
        // create the elements for date,icon, temp, humidty, wind
        // add the info to the elements
        // append the elements to the div

        // append the div to the element with the id future
        
      }
    });
}

submit.addEventListener("submit", handleUserInput);
