import React from "react";
import {
  useGetLocationByLatLonQuery,
  useGetWeatherByLatLonQuery,
} from "../features/weather/weatherApiSlice";
import MyCurrentWeather from "./MyCurrentWeather";
import WeatherIconCarousel from "./baseComponents/WeatherIconCarousel";
import AlertError from "./baseComponents/AlertError";
import { CloudLightning, MapPinX, RefreshCcw } from "lucide-react";
import BaseLoader from "./baseComponents/BaseLoader";

interface WeatherDashBoardProps {
  lat: number | null;
  lon: number | null;
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
    { skip: !lat }
  );

  const {
    data: locationData,
    isError: isLocationError,
    isLoading: isLocationLoading,
    error: locationError,
    refetch: locationRefetch,
  } = useGetLocationByLatLonQuery(
    { lat: lat || 0, lon: lon || 0 },
    { skip: !lat }
  );

  const weatherErrorMessage =
    typeof weatherError === "object" && "error" in weatherError
      ? (weatherError.error as string)
      : "Something went wrong";

  const locationErrorMessage =
    typeof locationError === "object" && "error" in locationError
      ? (locationError.error as string)
      : "Something went wrong";

  const refreshHandler = () => {
    if (lat && lon) {
      weatherRefetch();
      locationRefetch();
    }
  };

  return (
    <>
      <h1 className="text-center text-blue-400 text-xl mt-6 mb-6 flex items-center gap-3 justify-center">
         Selected Location's Weather
        <WeatherIconCarousel />
      </h1>

      {isWeatherError && (
        <AlertError
          errorIcon={CloudLightning}
          errorName={"Failed to fetch weather data"}
          buttonIcon={RefreshCcw}
          error={weatherErrorMessage}
          cb={refreshHandler}
          buttonText="Refresh"
        />
      )}

      {isLocationError && (
        <AlertError
          errorIcon={MapPinX}
          errorName={"Failed to retrieve your location"}
          buttonIcon={RefreshCcw}
          error={locationErrorMessage}
          cb={refreshHandler}
          buttonText="Refresh"
        />
      )}

      {( isWeatherLoading || isLocationLoading) && (
        <div className="container mt-10 mx-auto px-4 py-6 flex items-center justify-center h-[40vh]">
          <BaseLoader size={30} style="animate-spin" />
        </div>
      )}

      {weatherData && locationData && (
        <MyCurrentWeather
          weatherData={weatherData}
          isWeatherError={isWeatherError}
          weatherError={weatherError}
          weatherRefetch={weatherRefetch}
          locationData={locationData}
          isLocationError={isLocationError}
          locationError={locationError}
        />
      )}
    </>
  );
};

export default WeatherDashBoard;
