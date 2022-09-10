function formatDate(Today) {
  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");

  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[now.getDay()];
  let date = now.getDate();
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }

  h2.innerHTML = `${day} ${date} ${month} ${year}`;
  h3.innerHTML = `${hours} : ${minutes}`;
}

//Search event - displays the temperature in the city you are searching for//

function search(event) {
  alert("Looking for the weather forecast in selected location");
  event.preventDefault();

  let searchInput = document.querySelector("#searchBar-text");
  let h1 = document.querySelector("#searchCity");
  h1.innerHTML = `${searchInput.value}`;

  let apiKey = "126b4c3109648af60d931bdfb6f221d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=126b4c3109648af60d931bdfb6f221d1`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Convert celsius to farenheit - currently not working for some reason//
{
  function convertToCelsius(event) {
    event.preventDefault();
    let celsius = document.querySelector("#temp");
    celsius.innerHTML = Math.round(((celsius.innerHTML - 31) * 5) / 9);
  }
  function convertToFahrenheit(event) {
    let fahrenheit = document.querySelector("#temp");
    fahrenheit.innerHTML = Math.round((fahrenheit.innerHTML * 9) / 5 + 31);
  }

  function changeToCelsius() {
    let celsius = document.querySelector("#currentC");
    celsius.addEventListener("click", convertToCelsius);
  }

  function changeToFahrenheit() {
    let fahrenheitIcon = document.querySelector("#currentF");
    fahrenheitIcon.addEventListener("click", convertToFahrenheit);
  }

  changeToCelsius();
  changeToFahrenheit();
  formatDate();
}

let apiKey = "126b4c3109648af60d931bdfb6f221d1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&units=metric&appid=126b4c3109648af60d931bdfb6f221d1`;
let city = "response.data.name";

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = `${temperature}°`;
  let effectiveTemp = Math.round(response.data.main.feels_like);
  let effectiveElement = document.querySelector("#E-temp");
  effectiveElement.innerHTML = `${effectiveTemp}°`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity-prec");
  humidityElement.innerHTML = `${humidity}`;
  let windspeed = response.data.wind.speed;
  let windspeedElement = document.querySelector("#wind-speed");
  windspeedElement.innerHTML = `${windspeed}`;
}

axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);

//My position and displaying current temp in my position//

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "126b4c3109648af60d931bdfb6f221d1";
  let apiLocUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `Displaying the weather for your current location`;

  axios.get(`${apiLocUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getCurrentPosition);
