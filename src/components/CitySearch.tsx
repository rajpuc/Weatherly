import React, { useEffect, useRef, useState } from "react";
import { useGetCitySuggestionsQuery } from "../features/weather/weatherApiSlice";
import { Search } from "lucide-react";
import BaseLoader from "./baseComponents/BaseLoader";

interface CitySearchEntry {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

interface CitySearchProps {
  onSelectCity: (coords: { lat: number; lon: number }) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSelectCity }) => {
  const [search, setSearch] = useState<string>("");
  const [history, setHistory] = useState<CitySearchEntry[]>([]);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: suggestions = [],
    isFetching,
  } = useGetCitySuggestionsQuery(search, {
    skip: search.length < 2,
  });

  useEffect(() => {
    const stored = localStorage.getItem("citySearchHistory");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid localStorage data", err);
      }
    }
  }, []);

  const saveToHistory = (city: CitySearchEntry) => {
    const updated = [city, ...history.filter(c => c.name !== city.name)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("citySearchHistory", JSON.stringify(updated));
  };

  const handleSelect = (city: CitySearchEntry) => {
    const { lat, lon } = city;
    onSelectCity({ lat, lon });
    saveToHistory(city);
    setSearch("");
    setInputFocused(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const shouldShowDropdown =
    inputFocused && (search.length > 1 || history.length > 0);

  return (
    <div className="max-w-md mx-auto px-6 relative mt-12" ref={containerRef}>

      <div className={`px-2 relative w-full  border-1 rounded flex items-center ${inputFocused ? 'border-2' : ''}`}>
        <Search />
        <input
          type="text"
          value={search}
          onFocus={() => setInputFocused(true)}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search here by city name..."
          className="w-full p-2 focus:outline-0 dark:text-white"
        />
      </div>



      {shouldShowDropdown && (
        <div className="absolute left-0  right-0 z-10 bg-white border mt-2 rounded shadow-md max-h-72 overflow-y-auto divide-y max-w-md mx-6">
          {/* Suggestions */}
          <div>
            <h4 className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">Suggestions</h4>
            {search.length > 1 && isFetching && (
              <div className="w-full h-20 flex items-center justify-center">
                <BaseLoader size={25} style="animate-spin dark:text-black"/>
              </div>
            )}

            {search.length > 1 && suggestions.length > 0 && (
              
                suggestions.map((city, idx) => {
                  const cityEntry: CitySearchEntry = {
                    name: city.name,
                    country: city.country,
                    state: city.state,
                    lat: city.lat,
                    lon: city.lon,
                  };
                  return (
                    <div
                      key={`s-${idx}`}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:text-black"
                      onClick={() => handleSelect(cityEntry)}
                    >
                      {city.name}, {city.state && `${city.state}, `}{city.country}
                    </div>
                  );
                })
              

            )}
          </div>


          {/* History */}
          {history.length > 0 && (
            <div>
              <h4 className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100">Recent Searches</h4>
              {history.map((city, idx) => (
                <div
                  key={`h-${idx}`}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 text-blue-600"
                  onClick={() => handleSelect(city)}
                >
                  {city.name}, {city.state && `${city.state}, `}{city.country}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
