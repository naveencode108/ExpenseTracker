import React, { useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";

function WeatherApp() {
  const [weather, setWeather] = useState({
    city: "New York",
    temperature: 25,
    condition: "Sunny",
  });

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
      case "Cloudy":
        return <WiCloud className="text-gray-400 text-6xl" />;
      case "Rainy":
        return <WiRain className="text-blue-400 text-6xl" />;
      case "Snowy":
        return <WiSnow className="text-white text-6xl" />;
      default:
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-200 to-indigo-200 rounded-2xl p-4 flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Search City"
          className="px-1 ring-1 py-1 text-sm rounded-lg focus:outline-none"
        />
        <button className="px-2 py-1 text-sm cursor-pointer bg-blue-500 text-white rounded-xl">
          Search
        </button>
      </div>

      <div className="rounded-2xl shadow-xl bg-gray bg-opacity-20 backdrop-blur-md text-center w-40">
        <h2 className="text-2xl font-bold">{weather.city}</h2>
        <div className="flex justify-center my-1">
          {getWeatherIcon(weather.condition)}
        </div>
        <p className="text-2xl font-semibold">{weather.temperature}°C</p>
        <p className="text-sm mt-1">{weather.condition}</p>
      </div>
    </div>
  );
}

export default WeatherApp;
