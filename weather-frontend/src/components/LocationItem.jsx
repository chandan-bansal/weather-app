import React from "react";

const LocationItem = ({ locationObj, selectCity }) => {
  return (
    <div
      className="flex items-center gap-3 p-3 hover:bg-blue-100 transition-colors duration-300 cursor-pointer rounded-md"
      onClick={() => selectCity(locationObj?.name)}
    >
      <div className="text-lg font-semibold text-gray-800">
        {locationObj?.name}, {locationObj?.region}, {locationObj?.country}
      </div>
    </div>
  );
};

export default LocationItem;
