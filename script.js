async function fetchWeather() {
  const apiKey = "484915952d0fefc6126f45a6df334840"; // Replace with your OpenWeatherMap API key

  try {
    document.getElementById("weather-widget").classList.add("loading");

    // Fetch location data
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) throw new Error("Failed to fetch location data.");
    const locationData = await response.json();

    const location = `${locationData.city}, ${locationData.country_name}`;
    document.getElementById("location").innerText = location;

    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${locationData.city}&appid=${apiKey}&units=metric`
    );
    if (!weatherResponse.ok) throw new Error("Failed to fetch weather data.");
    const weatherData = await weatherResponse.json();

    document.getElementById("temp").innerText = `${Math.round(
      weatherData.main.temp
    )}°C`;
    document.getElementById(
      "humidity"
    ).innerText = `Humidity: ${weatherData.main.humidity}%`;
    document.getElementById("wind").innerText = `Wind: ${Math.round(
      weatherData.wind.speed
    )} m/s`;
    document.getElementById(
      "weather-icon"
    ).src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    const date = new Date();
    document.getElementById("date").innerText = date.toLocaleDateString();

    // Start dynamic clock
    updateTime();
    setInterval(updateTime, 1000);
  } catch (error) {
    document.getElementById("weather-widget").innerHTML = `
      <div class="error">Unable to fetch weather data. Please try again later.</div>
    `;
    console.error(error);
  } finally {
    document.getElementById("weather-widget").classList.remove("loading");
  }
}

// Function to update time dynamically
function updateTime() {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("time").innerText = time;
}

document.addEventListener("DOMContentLoaded", fetchWeather);
