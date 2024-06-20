const apiKey = "7688aedded5c20ea0921f29c86a48422";
const submit = document.getElementById("form");
const currentDiv = document.getElementById("current");
const futureElement = document.getElementById("future");
const historyArray = JSON.parse(localStorage.getItem("cities"))||[]

for(let i=1; i<historyArray.length; i++){
  const historybutton = document.createElement ("button")
  historybutton.setAttribute("class","hbutton")
  historybutton.textContent = historyArray[i]
  document.getElementById("searchHistory").append(historybutton)  
}

function handleUserInput(event) {
  event.preventDefault();
  const inputEl = document.getElementById("search").value;
const historybutton = document.createElement ("button")
historybutton.setAttribute("class","hbutton")
historybutton.textContent = inputEl
document.getElementById("searchHistory").append(historybutton)
  //   gather the input content Template literals ${}
  getWeather(inputEl);
  getForecast(inputEl);
}

function getWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentDiv.innerHTML = ''
      // console.log("CURRENT WEATHER", data);
      console.log(current, data);
      historyArray.push(data.name)
      localStorage.setItem("cities", JSON.stringify(historyArray))
      // NEED TO EXTRACT THE FOLLOWING FROM DATA: CITY NAME, DATE (DT), WEATHER ICON, TEMPREATURE, HUMIDITY, WIND SPEED
      //let newData = {name:data.name, date:data.dt,icon:data.weather[0].icon,temperature:data.main.temperature,humidity:data.main.humidity,windspeed:data.wind.speed;
      // NEED TO CREATE THE FOLLOWING ELEMENTS USING JAVASCRIPT: H2 for the city name and date
      var date = new Date(data.dt * 1000).toLocaleDateString();
      console.log(data);

      const cityName = document.createElement("h2");
      const temperature = document.createElement("p");
      const humidity = document.createElement("p");
      const wind = document.createElement("p");
      const image = document.createElement("img");

      cityName.textContent = data.name + ' ' +date;
      temperature.textContent = "Temp: " + data.main.temp + " F";
      humidity.textContent = "Humidity: " +data.main.humidity + " %";
      wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
      image.setAttribute(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );

      currentDiv.append(cityName, image, temperature, humidity, wind);
    });
}

function getForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("FORECAST", data.list);
      
      futureElement.innerHTML = ''
      for (let i = 3; i < data.list.length; i += 8) {
        const element = data.list[i];
        console.log(element);

        // create a div this is not working
        var date = new Date(element.dt * 1000).toLocaleDateString();
        console.log(data);

        // create the elements for date,icon, temp, humidty, wind
        const div = document.createElement("div");
        const dt = document.createElement("h3");
        const image = document.createElement("img");
        const temperature = document.createElement("p");
        const humidity = document.createElement("p");
        const wind = document.createElement("p");
        console.log(data);

        div.setAttribute('class', 'forecastCard')

        // add the info to the elements
        dt.textContent = date;
        temperature.textContent = 'Temp: ' + element.main.temp ;
        humidity.textContent = element.main.humidity;
        wind.textContent = element.wind.speed;
        image.setAttribute(
          "src",
          "http://openweathermap.org/img/w/" +
            element.weather[0].icon +
            ".png"
        );

        // append the elements to the div
        div.append(dt, image, temperature, humidity, wind);

        // append the div to the element with the id future
        futureElement.appendChild(div);
      }
    });
}

getWeather("Amarillo")
getForecast("Amarillo")
submit.addEventListener("submit", handleUserInput);
