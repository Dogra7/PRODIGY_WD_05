const API_KEY = "f37af1f1d3a20737210c47b9d4034a6b"; // Replace with your OpenWeatherMap API key

function fetchWeather() {
    const location = document.getElementById("locationInput").value;
    if (!location) {
        alert("Please enter a location!");
        return;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(err => alert("Error fetching weather data. Check the location and try again."));
}

function fetchWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
                .then(response => response.json())
                .then(data => displayWeather(data))
                .catch(err => alert("Error fetching weather data."));
        }, () => {
            alert("Unable to retrieve your location.");
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data) {
    if (data.cod !== 200) {
        alert(data.message);
        return;
    }
    const weatherInfo = `
        <h2>Weather in ${data.name}, ${data.sys.country}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById("weatherInfo").innerHTML = weatherInfo;
}