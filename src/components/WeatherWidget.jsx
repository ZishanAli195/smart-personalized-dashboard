import React, { useState, useEffect } from "react";
import WidgetCard from "./WidgetCard";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import GrainIcon from "@mui/icons-material/Grain";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const apiKey = import.meta.env.VITE_OPENWEATHER_KEY;

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      setError(true);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            setWeather(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Weather fetch error:", err);
            setError(true);
            setLoading(false);
          });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError(true);
        setLoading(false);
      }
    );
  }, []);

  if (loading)
    return (
      <WidgetCard title="Weather" icon={<WbSunnyIcon className="animate-sun" />}>
        <p>Loading weather...</p>
      </WidgetCard>
    );

  if (error || !weather)
    return (
      <WidgetCard title="Weather" icon={<WbSunnyIcon className="animate-sun" />}>
        <p>Unable to fetch weather</p>
      </WidgetCard>
    );

  const { main, weather: weatherArr, name, wind } = weather;
  const temp = main.temp.toFixed(1);
  const feelsLike = main.feels_like.toFixed(1);
  const description = weatherArr[0].description;
  const weatherMain = weatherArr[0].main.toLowerCase();

  // Icon + animation + background
  let weatherIcon = <WbSunnyIcon className="animate-sun" />;
  let bgColor = "#FFD700";

  if (weatherMain.includes("cloud")) {
    weatherIcon = <CloudIcon className="animate-cloud" />;
    bgColor = "#B0C4DE";
  } else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
    weatherIcon = <GrainIcon className="animate-rain" />;
    bgColor = "#87CEFA";
  } else if (weatherMain.includes("snow")) {
    weatherIcon = <AcUnitIcon className="animate-snow" />;
    bgColor = "#E0FFFF";
  } else if (weatherMain.includes("thunderstorm")) {
    weatherIcon = <ThunderstormIcon className="animate-thunder" />;
    bgColor = "#778899";
  }

  return (
    <WidgetCard
      title={`Weather in ${name}`}
      icon={weatherIcon}
      style={{ backgroundColor: bgColor, color: "#333", transition: "0.3s" }}
    >
      <h2>{temp}°C</h2>
      <p style={{ textTransform: "capitalize", marginBottom: "8px" }}>
        {description}
      </p>
      <p>Feels like: {feelsLike}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind: {wind.speed} m/s</p>
    </WidgetCard>
  );
}
