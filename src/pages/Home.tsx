import React, { useState } from "react";
import AppLayout from "../layout/AppLayout";
import {
  useGetLocationByLatLonQuery,
  useGetWeatherByLatLonQuery,
} from "../features/weather/weatherApiSlice";
import { useGeoLocation } from "../hooks/useGeoLocation";
import LocationError from "../components/baseComponents/LocationError";
import MyCurrentWeather from "../components/MyCurrentWeather";
import BaseLoader from "../components/baseComponents/BaseLoader";
import WeatherIconCarousel from "../components/baseComponents/WeatherIconCarousel";
import CitySearch from "../components/CitySearch";
import WeatherDashBoard from "../components/WeathDashBoard";
import AlertError from "../components/baseComponents/AlertError";
import { MapPin, MapPinOff } from "lucide-react";

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
  } = useGetLocationByLatLonQuery(
    { lat: coordinates?.lat || 0, lon: coordinates?.lon || 0 },
    { skip: !coordinates }
  );
 
  interface WeatherDashBoardProps {
    lat: number|null;
    lon: number|null;
  }
  const [co,setCo] = useState<WeatherDashBoardProps>({
    lat:null,
    lon:null
  })

  return (
    <AppLayout>
      {/* {error && <LocationError error={error} getLocation={getLocation} />} */}


      <CitySearch onSelectCity={(co)=>{setCo(co)}}/>

      {co.lat&&
        <WeatherDashBoard lat={co.lat} lon={co.lon}/>
      }

      <h1 className="text-center text-blue-400 text-xl mt-6 mb-6 flex items-center gap-3 justify-center">My Area's Weather 
        <WeatherIconCarousel/>
      </h1>
      
      {error && <AlertError errorIcon={MapPinOff}  errorName={'Location Error'} buttonIcon={MapPin} error={error} cb={getLocation}/>}

      {(isWeatherLoading || isLocationLoading)&& <div className="container mt-10 mx-auto px-4 py-6 flex items-center justify-center h-[40vh]">
        <BaseLoader size={30} style="animate-spin"/>
      </div>}

      
      {(weatherData && locationData) && <MyCurrentWeather
        weatherData={weatherData}
        isWeatherError={isWeatherError}
        weatherError={weatherError}
        weatherRefetch={weatherRefetch}
        locationData={locationData}
        isLocationError={isLocationError}
        locationError={locationError}
      />}
    </AppLayout>
  );
};

export default Home;
