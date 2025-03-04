import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import WeatherList from "../components/WeatherList";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchedCity, setSearchedCity] = useState("");

  useEffect(() => {
    getDefaultData();
  }, []);

  useEffect(() => {
    fetchCityWeatherData(searchedCity);
  }, [searchedCity]);

  const getCityWeather = (str) => {
    setSearchedCity(str);
  };

  const fetchCityWeatherData = async (city) => {
    if (city !== "") {
      try {
        const response = await fetch(
          `http://localhost:3000/weatherForecast/${city}/10`
        );
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const getDefaultData = async () => {
    const response = await fetch(`http://localhost:3000/`);
    const data = await response.json();
    setWeatherData(data);
  };

  const toggleExpanded = () => {
    setIsExpanded((prevVal) => !prevVal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-700 text-white p-6">
      {/* Navbar */}
      <Navbar setSearchedCity={getCityWeather} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto bg-white text-gray-900 rounded-xl shadow-lg p-6 mt-6">
        {/* Expand Button */}
        <div className="flex justify-between mb-4">
          <h1 className="text-3xl font-bold m-3 pl-5">{weatherData?.location?.name}</h1>
          <button
            className={`px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-300 ${
              isExpanded
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white shadow-md`}
            onClick={toggleExpanded}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {/* Weather List */}
        <WeatherList
          weatherData={weatherData?.forecast?.forecastday}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};

export default WeatherPage;
