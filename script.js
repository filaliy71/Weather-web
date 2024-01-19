const button = document.getElementById("hhh");
const statu = document.getElementById("status");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weatherIcon");
const cityInput = document.getElementById("ppa");
const body = document.querySelector("body");
const cnameElement = document.getElementById("Cname");
const windElement = document.getElementById("wind");
const currentTimeElement = document.getElementById("currentTime");

let results;

document.addEventListener("DOMContentLoaded", () => {
  if (cityInput.value === "") {
    findMyCoordinate();
  }
});

async function findMyCoordinate() {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const bdcAPI = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;
      getAPI(bdcAPI);
    } catch (err) {
      alert(err.message);
    }
  } else {
    alert("Geolocation is not supported");
  }
}

function getAPI(bdcAPI) {
  fetch(bdcAPI)
    .then((response) => response.json())
    .then((data) => {
      results = data;
      console.log(results);
      hhh(results);
    })
    .catch((err) => console.error(err));
}

function setWeatherIcon(weatherMain) {
  const iconMap = {
    Clouds: "clouds.png",
    Clear: "clear.png",
    Rain: "rain.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
  };
  const icon = iconMap[weatherMain] || "default.png";
  weatherIcon.src = `images/${icon}`;
}

function hhh(results) {
  if (!results) {
    alert("Location data is not available. Please enter a city.");
    return;
  }

  fetchWeather(results.city);
}

async function fetchWeather(city) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=126641609d1c29914e1f72a79447549e`);
    const data = await response.json();

    const temp = data.list[0].main.temp - 273.15;
    temperature.innerHTML = `${Math.floor(temp)}°C`;

    const balance = 30;
    statu.innerText = temp > balance ? "The temperature is above the threshold." : temp < balance ? "The temperature is below the threshold." : "Balance";

    setWeatherIcon(data.list[0].weather[0].main);

    cnameElement.innerHTML = city;
    windElement.innerHTML = `${data.list[0].wind.speed}km/h`;

    const inputDate = data.list[0].dt_txt;
    const dayName = getDayName(inputDate);
    console.log(dayName);
    currentTimeElement.innerHTML = dayName;
  } catch (error) {
    console.error(error);
  }
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

function getDayName(dateString) {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}
