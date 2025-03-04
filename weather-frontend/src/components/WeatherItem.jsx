import React from "react";
import HourItem from "./HourItem";
import {format} from "date-fns"
const WeatherItem = ({ data, isExpanded }) => {
  return (
    <>
      <div className="grid grid-cols-8 text-center gap-10 items-center border-b border-gray-300 p-3 bg-white hover:bg-gray-100 transition">
        <p className="font-medium">{format(new Date(data.date), "d MMMM, yyyy")}</p>

        <div className="flex flex-col items-center">
          <p className="text-sm">{data.day.condition.text}</p>
          <img src={data.day.condition.icon} className="w-10 h-10" />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{data.day.avgtemp_c}°C</p>
          <div className="flex gap-2 text-xs text-gray-600">
            <p>Min: {data.day.mintemp_c}°C</p>
            <p>Max: {data.day.maxtemp_c}°C</p>
          </div>
        </div>

        <p className="text-gray-700">{data.day.maxwind_kph} km/h</p>
        <p className="text-gray-700">{data.day.totalprecip_mm} mm</p>
        <p className="text-gray-700">{data.day.avghumidity}%</p>
        <p className="text-gray-700">{data.astro.sunrise}</p>
        <p className="text-gray-700">{data.astro.sunset}</p>
      </div>

      {/* Expanded Hourly Data */}
      {isExpanded && (
        <div className="flex gap-4 overflow-x-auto p-4 bg-gray-50 rounded-lg shadow-inner">
          {data.hour.map((item, index) => (
            <HourItem key={index} hourItem={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default WeatherItem;
