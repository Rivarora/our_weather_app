// Set background based on weather
const apiKey = "893971476f90297c35a0aab354c27d75"; // Replace with your API key
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

