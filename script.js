const button = document.getElementById("hhh");
const statu = document.getElementById("status");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weatherIcon");
const cityInput = document.getElementById("ppa");
const body = document.querySelector("body");

let results;

document.addEventListener("DOMContentLoaded", () => {
  if (cityInput.value === "") {
    findMyCoordinate();
  }
});

function findMyCoordinate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
        getAPI(bdcAPI);
      },
      (err) => {
        alert(err.message);
      }
    );
  } else {
    alert("Geolocation is not supported");
  }
}

function getAPI(bdcAPI) {
  const http = new XMLHttpRequest();
  http.open("GET", bdcAPI);
  http.send();
  http.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      results = JSON.parse(this.responseText);
      console.log(results);
      hhh(results);
    }
  };
}

function hhh(results) {
  if (!results) {
    alert("Location data is not available. Please enter a city.");
    return;
  }

  fetchWeather(results.city);
}

function fetchWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=126641609d1c29914e1f72a79447549e"
  )
    .then((response) => response.json())
    .then((data) => {
      const temp = data.list[0].main.temp - 273.15;
      temperature.innerHTML = Math.floor(temp) + "°C";
      const balance = 30;
      if (temp > balance) {
        statu.innerText = "The temperature is above the threshold.";
      } else if (temp < balance) {
        statu.innerText = "The temperature is below the threshold.";
      } else {
        statu.innerText = "Balance";
      }

      if (data.list[0].weather[0].main === "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.list[0].weather[0].main === "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.list[0].weather[0].main === "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.list[0].weather[0].main === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.list[0].weather[0].main === "Mist") {
        weatherIcon.src = "images/mist.png";
      }
      console.log(data);
      document.getElementById("Cname").innerHTML = city;
      document.getElementById("wind").innerHTML =
        data.list[0].wind.speed + "km/h";
      function getDayName(dateString) {
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const date = new Date(dateString);
        const dayIndex = date.getDay();
        return daysOfWeek[dayIndex];
      }

      const inputDate = data.list[0].dt_txt;
      const dayName = getDayName(inputDate);
      console.log(dayName);
      document.getElementById("currentTime").innerHTML = dayName;
    });
}

button.addEventListener("click", function () {
  const city = cityInput.value;

  if (city === "") {
    if (results && results.city) {
      fetchWeather(results.city);
    } else {
      alert("Location data is not available. Please enter a city.");
    }
  } else {
    fetchWeather(city);
  }
});
