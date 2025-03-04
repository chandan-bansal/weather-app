import React from "react";
import WeatherItem from "./WeatherItem";

const WeatherList = ({ weatherData, isExpanded }) => {
  return (
    <div className="m-5">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-8 gap-3 bg-gray-200 p-3 rounded-md font-semibold text-gray-800 text-center">
          <p>Date</p>
          <p>Conditions</p>
          <p>Avg Temp (°C)</p>
          <p>Max Wind (kmph)</p>
          <p>Total Precip. (mm)</p>
          <p>Avg. Humidity</p>
          <p>Sunrise</p>
          <p>Sunset</p>
        </div>

        {weatherData?.map((item, index) => (
          <WeatherItem key={index} data={item} isExpanded={isExpanded} />
        ))}
      </div>
    </div>
  );
};

export default WeatherList;
