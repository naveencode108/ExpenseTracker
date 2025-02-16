import React, { useEffect, useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from "react-icons/wi";
import { getWeather } from 'w-weather-info'

function WeatherApp() {
  const [search, setSearch] = useState('');

  const [weather, setweather] = useState(null);

  const key = import.meta.env.VITE_API;


  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
      case "Clouds":
        return <WiCloud className="text-gray-400 text-6xl" />;
      case "Rainy":
        return <WiRain className="text-blue-400 text-6xl" />;
      case "Smoke":
        return <WiSnow className="text-white text-6xl" />;
      default:
        return <WiDaySunny className="text-yellow-400 text-6xl" />;
    }
  };

  const handleWeather = async () => {
      let { data } = await getWeather(search, key);
      if(data.cod==200){
      setweather(data);
    }
    else{
      setweather(null);
    }
  }

  return (
    <div className="bg-gradient-to-r from-orange-200 to-indigo-200 rounded-2xl p-4 flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search City"
          className="px-1 ring-1 py-1 text-sm rounded-lg focus:outline-none"
        />
        <button type="submit"   disabled={!search.trim()} onClick={handleWeather} className="px-2 py-1 text-sm cursor-pointer bg-blue-500 text-white rounded-xl">
          Search
        </button>
      </div>

   

      <div className="rounded-2xl shadow-xl bg-gray bg-opacity-20 backdrop-blur-md text-center w-40">
        <h2 className="text-2xl font-bold">{weather!=null? weather?.name:'Weather'}</h2>
        <div className="flex justify-center my-1">
          {getWeatherIcon(weather!=null? weather?.weather[0]?.main:'')}
        </div>
        <p className="text-2xl font-semibold">{weather!=null? Math.floor(weather?.main.temp - 273.15).toFixed(0):''}°C</p>
        <p className="text-sm mt-1">{weather!=null? weather.weather[0].main:''}</p>
      </div>
    </div>
  );
}

export default WeatherApp;
