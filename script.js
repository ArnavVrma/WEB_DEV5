function getWeather() {
    let city = document.getElementById("city").value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1")
    .then(response => response.json())
    .then(data => {
        if (!data.results) {
            document.getElementById("result").innerHTML = "City not found!";
            return;
        }
        let latitude = data.results[0].latitude;
        let longitude = data.results[0].longitude;
        fetch("https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code")
        .then(response => response.json())
        .then(weather => {
            document.getElementById("result").innerHTML =
                "<h2>" + city + "</h2>" +
                "<h3>Temperature: " + weather.current.temperature_2m + " °C</h3>" +
                "<p>Humidity: " + weather.current.relative_humidity_2m + "%</p>" +
                "<p>Wind Speed: " + weather.current.wind_speed_10m + " km/h</p>" +
                "<p>Weather Code: " + weather.current.weather_code + "</p>";
        });
    });
}