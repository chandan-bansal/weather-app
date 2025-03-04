import React from "react";
import {format, parse} from "date-fns"
const HourItem = ({ hourItem }) => {
  const formatTime = (dateString) => {
    // Parse the date string into a Date object
    const date = parse(dateString, "yyyy-MM-dd HH:mm", new Date());
  
    // Format the time as "h:mm a" (1:00 AM)
    return format(date, "h:mm a");
  };
  return (
    <div className="flex flex-col items-center p-3 bg-white border border-gray-300 rounded-lg shadow-md min-w-[200px]">
      <p className="text-xs text-gray-500">{formatTime(hourItem.time)}</p>
      <img src={hourItem.condition.icon} className="w-8 h-8" />
      <p className="text-xs text-gray-700">{hourItem.condition.text}</p>
      <p className="text-sm font-medium">{hourItem.temp_c}°C</p>
      <p className="text-xs text-gray-600">Wind: {hourItem.wind_kph} km/h</p>
    </div>
  );
};

export default HourItem;

