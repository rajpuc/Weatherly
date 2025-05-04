import React from "react";
import { MapPin, MapPinOff } from "lucide-react";

interface LocationErrorProps {
  error: string;
  getLocation: () => void;
}

const LocationError: React.FC<LocationErrorProps> = ({ error, getLocation }) => {
  return (
    <div className="px-6 sm:px-0">
      <div className="p-4 border-2 border-red-500 rounded-md container mx-auto">
        <h1 className="flex gap-2 items-center text-xl text-red-500 font-medium">
          <MapPinOff />
          <span>Location Error</span>
        </h1>
        <p className="text-red-500">{error}</p>
        <button
          onClick={getLocation}
          className="mt-3 border-2 px-3 gap-2 rounded-sm
                     bg-white text-gray-800 border-red-500
                     hover:bg-white hover:border-red-500
                     active:bg-white active:border-red-500 cursor-pointer
                     focus:outline-none focus:ring-red-500 focus:border-transparent
                     transition-colors duration-200 flex items-center py-1"
        >
          <MapPin size={20} />
          Enable Location
        </button>
      </div>
    </div>
  );
};

export default LocationError;

