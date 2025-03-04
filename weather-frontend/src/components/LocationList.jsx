import React from 'react'
import LocationItem from './LocationItem';

const LocationList = (props) => {
    const {locationList, selectCity} = props;
  return (
    <div className="border-2 rounded-xl absolute top-12 w-md right-12 bg-white p-4 shadow-lg z-50">{
        locationList?.map((item)=>{
            return(
                <LocationItem locationObj={item} selectCity = {selectCity}/>
            )
        })
    }</div>
  )
}

export default LocationList