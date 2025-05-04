import React, { useState } from "react";
import AppLayout from "../layout/AppLayout";
import {
  useGetLocationByLatLonQuery,
  useGetWeatherByLatLonQuery,
} from "../features/weather/weatherApiSlice";
import { useGeoLocation } from "../hooks/useGeoLocation";
import MyCurrentWeather from "../components/MyCurrentWeather";
import BaseLoader from "../components/baseComponents/BaseLoader";
import WeatherIconCarousel from "../components/baseComponents/WeatherIconCarousel";
import CitySearch from "../components/CitySearch";
import WeatherDashBoard from "../components/WeathDashBoard";
import AlertError from "../components/baseComponents/AlertError";
import { CloudLightning, MapPin, MapPinOff, MapPinX, RefreshCcw } from "lucide-react";

const Home: React.FC = () => {
  const { coordinates, error, getLocation, isLoading } = useGeoLocation();

  const {
    data: weatherData,
    isLoading: isWeatherLoading,
    isError: isWeatherError,
    error: weatherError,
    refetch: weatherRefetch,
  } = useGetWeatherByLatLonQuery(
    { lat: coordinates?.lat || 0, lon: coordinates?.lon || 0 },
    { skip: !coordinates }
  );
  const {
    data: locationData,
    isError: isLocationError,
    isLoading: isLocationLoading,
    error: locationError,
    refetch:locationRefetch
  } = useGetLocationByLatLonQuery(
    { lat: coordinates?.lat || 0, lon: coordinates?.lon || 0 },
    { skip: !coordinates }
  );

  interface WeatherDashBoardProps {
    lat: number | null;
    lon: number | null;
  }
  const [latlon, setLatLon] = useState<WeatherDashBoardProps>({
    lat: null,
    lon: null,
  });


  const weatherErrorMessage = typeof weatherError === "object" && "error" in
  weatherError ? (weatherError.error as string) : "Something went wrong";

  const locationErrorMessage = typeof locationError === "object" && "error" in
  locationError ? (locationError.error as string) : "Something went wrong";

  const refreshHandler = () => {
    getLocation();
    if(coordinates){
      weatherRefetch();
      locationRefetch();
    }
  }

  return (
    <AppLayout>
      <CitySearch
        onSelectCity={(coordinates) => {
          setLatLon(coordinates);
        }}
      />
      {latlon.lat && latlon.lon && (
        <WeatherDashBoard lat={latlon.lat} lon={latlon.lon} />
      )}
      
      <h1 className="text-center text-blue-400 text-xl mt-6 mb-6 flex items-center gap-3 justify-center">
        My Area's Weather
        <WeatherIconCarousel />
      </h1>


      {error && (
        <AlertError
          errorIcon={MapPinOff}
          errorName={"Location Error"}
          buttonIcon={MapPin}
          error={error}
          cb={getLocation}
          buttonText="Enable Location"
        />
      )}

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

      {(isLoading || isWeatherLoading || isLocationLoading) && (
        <div className="container mt-10 mx-auto px-4 py-6 flex items-center justify-center h-[40vh]">
          <BaseLoader size={30} style="animate-spin" />
        </div>
      )}

      
      {weatherData && locationData && (
        <MyCurrentWeather
          weatherData={weatherData}
          locationData={locationData}
        />
      )}
    </AppLayout>
  );
};

export default Home;
