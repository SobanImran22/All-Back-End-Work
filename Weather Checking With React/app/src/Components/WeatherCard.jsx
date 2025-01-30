import React, { useState } from "react";


function Weather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = "51407aeaab70d0bd4bf8b0385c68a9e5"; // Replace with your OpenWeatherMap API Key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found!");
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location) fetchWeather();
  };

  return (
    <div className="weather-app">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Get Weather
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p className="temperature">{weather.main.temp} °C</p>
          <p className="description">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
