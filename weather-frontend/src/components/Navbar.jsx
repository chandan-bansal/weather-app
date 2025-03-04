import React, { useState } from "react";
import LocationList from "./LocationList";

const Navbar = ({ setSearchedCity }) => {
  const [searchString, setSearchString] = useState("");
  const [locationData, setLocationData] = useState([]);

  const getSearch = async (e) => {
    const searchString = e.target.value;
    setSearchString(searchString);
    if (searchString.trim() === "") {
      setLocationData([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/search/${searchString}`);
      const data = await response.json();
      setLocationData(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const onBlurAction = () => {
    setTimeout(() => {
      setSearchString("");
      setLocationData([]);
    }, 300);
  };

  return (
    <div className="w-full bg-blue-600 shadow-md p-4 flex justify-between items-center text-white">
      {/* App Name */}
      <h1 className="text-2xl font-bold tracking-wide">How's the Weather?</h1>

      {/* Search Box */}
      <div className="relative w-80">
        <input
          className="w-full p-2 bg-white rounded-lg outline-none text-gray-800 shadow-md focus:ring-2 focus:ring-blue-300"
          type="text"
          placeholder="Enter city name..."
          name="searchString"
          onChange={getSearch}
          value={searchString}
          onBlur={onBlurAction}
        />

        {/* Location List Dropdown */}
        {locationData.length > 0 && (
          <LocationList locationList={locationData} selectCity={setSearchedCity} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
