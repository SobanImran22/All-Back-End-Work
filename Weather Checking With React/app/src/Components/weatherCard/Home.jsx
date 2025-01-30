import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import Weather from "../WeatherCard";
import moment from "moment"; // Import moment

function Home() {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState([]);

  const submitHandel = async (e) => {
    e.preventDefault();
    console.log("I am submit handler");
    try {
      let response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/?q=${cityName}&appid=362e3925beef0fdf5789f2aa032834d9&units=metric`
      );
      console.log("response", response);
      setData(response.data.list);
    } catch (error) {
      console.log("error in api side", error);
    }
  };


  return (
    <div className="container text-center py-4">
  <h1 className="mb-4">Weather App</h1>
  <form onSubmit={submitHandel}>
    <Form.Group className="mb-3">
      <h2>{moment().subtract(6, "days").format("dddd, MMMM Do YYYY")}</h2>
      <Form.Label>City Name</Form.Label>
      <Form.Control
        type="text"
        value={cityName}
        placeholder="Enter your city name"
        onChange={(e) => setCityName(e.target.value)}
        required
      />
    </Form.Group>
    <Button type="submit" variant="primary">
      Get Weather
    </Button>
  </form>
  <div className="weather-cards mt-4">
    {data.map((eachForecast, index) => (
      <Weather
        key={index}
        date={eachForecast.dt_txt}
        temp={eachForecast.main.temp}
        min={eachForecast.main.temp_min}
        max={eachForecast.main.temp_max}
      />
    ))}
  </div>
</div>
  );
}

export default Home;
