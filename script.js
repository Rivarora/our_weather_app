const apiKey = '50a302ec07f5e90f5d54a02dcd0c714a'; // Replace with your API key
let currentTempCelsius = null;
let currentUnit = 'C'; // Track current temperature unit

const quotes = [
  "Chase the sunshine, even on cloudy days.",
  "Every storm runs out of rain.",
  "Let your dreams be as vast as the sky.",
  "Sunshine is the best medicine.",
  "Weather the storm with a smile."
];

function getWeather() {
  const input = document.getElementById("searchInput").value.trim();
  if (!input) return alert("Please enter a city or PIN code");

  const isPin = /^\d{5,6}$/.test(input);
  const apiUrl = isPin
    ? `https://api.openweathermap.org/data/2.5/weather?zip=${input},IN&appid=${apiKey}&units=metric`
    : `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error("Location not found");
      return res.json();
    })
    .then(data => {
      currentTempCelsius = data.main.temp;
      currentUnit = 'C';

      document.getElementById("weatherBox").classList.remove("hidden");
      document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temp").textContent = `🌡 ${currentTempCelsius.toFixed(1)} °C`;
      document.getElementById("desc").textContent = `🔎 ${data.weather[0].description}`;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      document.getElementById("quote").textContent = quotes[Math.floor(Math.random() * quotes.length)];

      // Background based on weather
      const weather = data.weather[0].main.toLowerCase();
      const body = document.body;
      if (weather.includes("cloud")) {
        body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      } else if (weather.includes("rain")) {
        body.style.background = "linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)";
      } else if (weather.includes("clear")) {
        body.style.background = "linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)";
      } else if (weather.includes("snow")) {
        body.style.background = "linear-gradient(to right, #e6dada, #274046)";
      } else {
        body.style.background = "linear-gradient(to right, #83a4d4, #b6fbff)";
      }
    })
    .catch(error => alert("Error fetching weather: " + error.message));
}

// Show date & time
function updateDateTime() {
  const now = new Date();
  const dateTimeStr = now.toLocaleString("en-IN", {
    weekday: 'long', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  document.getElementById("datetime").textContent = dateTimeStr;
}
setInterval(updateDateTime, 1000);
updateDateTime();

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherByCoords(lat, lon);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function getWeatherByCoords(lat, lon) {
  const apiKey = "34cbac9a046105efb7e62a6405ea0d71";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      currentTempCelsius = data.main.temp;
      currentUnit = 'C';
      displayWeather(data);
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeather(data) {
  document.getElementById("weatherBox").classList.remove("hidden");
  document.getElementById("location").innerText = data.name;
  document.getElementById("temp").innerText = `🌡 ${data.main.temp.toFixed(1)} °C`;
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("quote").innerText = getMotivationalQuote();
}

function getMotivationalQuote() {
  const quotes = [
    "Keep shining, no matter the weather!",
    "You're as bright as the sun today ☀",
    "Let your dreams rain success 🌧",
    "Every storm passes. Stay strong!",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById('clock').textContent = timeString;

  const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
  const dateString = now.toLocaleDateString('en-US', options);
  document.getElementById('date').textContent = dateString;
}
setInterval(updateClock, 1000);
updateClock();
// Toggle temperature between Celsius and Fahrenheit
function toggleTemperature() {
  if (currentTempCelsius === null) return;

  const tempElement = document.getElementById("temp");
  const toggleBtn = document.getElementById("toggleTemp");

  if (currentUnit === 'C') {
    const tempF = (currentTempCelsius * 9) / 5 + 32;
    tempElement.textContent = `🌡 ${tempF.toFixed(1)} °F`;
    toggleBtn.textContent = "Switch to °C";
    currentUnit = 'F';
  } else {
    tempElement.textContent = `🌡 ${currentTempCelsius.toFixed(1)} °C`;
    toggleBtn.textContent = "Switch to °F";
    currentUnit = 'C';
  }
}



