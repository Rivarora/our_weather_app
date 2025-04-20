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
fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error("Location not found");
      return res.json();
    })
    .then(data => {
      document.getElementById("weatherBox").classList.remove("hidden");
      document.getElementById("location").textContent = '${data.name}, ${data.sys.country}';
      document.getElementById("temp").textContent = '🌡 ${data.main.temp} °C';
      document.getElementById("desc").textContent = '🔎 ${data.weather[0].description}';
      document.getElementById("icon").src = 'https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png';
      document.getElementById("quote").textContent = "${quotes[Math.floor(Math.random() * quotes.length)]}";
    }
  )
  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
  
    // Safety check: make sure the button exists
    if (!toggleBtn) {
      console.error('Theme toggle button not found!');
      return;
    }
  
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️ Light Mode';
    }
  
    toggleBtn.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
  
      if (body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '☀️ Light Mode';
        localStorage.setItem('theme', 'dark');
      } else {
        toggleBtn.textContent = '🌙 Dark Mode';
        localStorage.setItem('theme', 'light');
      }
    });
  });
  
  

