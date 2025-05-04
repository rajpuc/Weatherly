import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import React from "react";


interface MyCurrentWeatherProps {
  weatherData: any;
  isWeatherError: boolean;
  weatherError: any;
  weatherRefetch: () => void;
  locationData: any;
  isLocationError: boolean;
  locationError: any;
}

const MyCurrentWeather: React.FC<MyCurrentWeatherProps> = ({
  weatherData,

  isWeatherError,
  weatherError,
  weatherRefetch,
  locationData,
  isLocationError,
  locationError,
}) => {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = weatherData;

  console.log(currentWeather);
  console.log(temp, feels_like, temp_min, temp_max, humidity);
  console.log(speed);

  if (isWeatherError) {
    return <div></div>;
  }

  if (isLocationError) {
    return <p className="text-red-500 text-center">{locationError?.message}</p>;
  }


  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Section - Weather Info */}
        <div className="space-y-6">
          {/* Location Info */}
          <div className="space-y-1">
            <div className="flex items-end gap-2 flex-col sm:flex-row">
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Weather in {locationData[0]?.name}
              </h2>
              {locationData[0]?.state && (
                <span className="text-lg sm:text-nowrap text-gray-500">
                  , {locationData[0].state}
                </span>
              )}
            </div>
            <p className="text-4xl font-bold sm:text-xl text-gray-600 dark:text-gray-400">{locationData[0]?.country}</p>
          </div>

          {/* Temperature Info */}
          <div className="flex items-center gap-4">
            <p className="text-6xl font-bold text-gray-900 dark:text-white">
              {formatTemp(temp)}C
            </p>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">
                Feels like{" "}
                <span className="font-medium">{formatTemp(feels_like)}C</span>
              </p>
              <div className="flex gap-3 text-sm font-medium">
                <span className="flex items-center gap-1 text-blue-600">
                  <ArrowDown className="h-4 w-4" />
                  {formatTemp(temp_min)}C
                </span>
                <span className="flex items-center gap-1 text-red-600">
                  <ArrowUp className="h-4 w-4" />
                  {formatTemp(temp_max)}C
                </span>
              </div>
            </div>
          </div>

          {/* Additional Weather Details */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">Humidity</p>
                <p className="text-sm text-gray-500 ">{humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ">
              <Wind className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-400">
                  Wind Speed
                </p>
                <p className="text-sm text-gray-500">{speed} m/s</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Weather Icon */}
        <div className="flex flex-col items-center md:items-end justify-center">
          <div className="relative w-full max-w-[200px] aspect-square">
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
              alt={currentWeather.description}
              className="h-full w-full object-contain"
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center  px-2 py-1 rounded-md">
              <p className="text-sm dark:text-gray-400 font-medium capitalize text-gray-700">
                {currentWeather.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCurrentWeather;
