
import React from "react";
import { useGetLocationByLatLonQuery, useGetWeatherByLatLonQuery } from "../features/weather/weatherApiSlice";
import MyCurrentWeather from "./MyCurrentWeather";


interface WeatherDashBoardProps {
  lat: number|null;
  lon: number|null;
}

const WeatherDashBoard: React.FC<WeatherDashBoardProps> = ({ lat, lon }) => {
 
const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    error: weatherError,
    refetch: weatherRefetch,
  } = useGetWeatherByLatLonQuery(
    { lat: lat || 0, lon: lon || 0 },
    { skip: !lat}
  );

  const {
    data: locationData,
    isError: isLocationError,
    isLoading: isLocationLoading,
    error: locationError,
  } = useGetLocationByLatLonQuery(
    { lat: lat || 0, lon: lon || 0 },
    { skip: !lat}
  );





  return (
    <>
    {(weatherData && locationData) && <MyCurrentWeather
        weatherData={weatherData}
        isWeatherError={isWeatherError}
        weatherError={weatherError}
        weatherRefetch={weatherRefetch}
        locationData={locationData}
        isLocationError={isLocationError}
        locationError={locationError}
      />}
    </>
  );
};

export default WeatherDashBoard;
