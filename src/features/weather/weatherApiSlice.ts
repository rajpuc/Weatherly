import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApiSlice = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.openweathermap.org" }),
  endpoints: (builder) => ({
    getWeatherByLatLon: builder.query({
      query: ({ lat, lon }: { lat: number; lon: number }) =>
        `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`,
      keepUnusedDataFor: 300,
    }),
    getLocationByLatLon: builder.query({
      query: ({ lat, lon }: { lat: number; lon: number }) =>
        `/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${
          import.meta.env.VITE_API_KEY
        }`,
      keepUnusedDataFor: 300,
    }),
    getWeatherByLocation: builder.query({
      query: (city: string) =>
        `/data/2.5/weather?q=${city}&appid==${import.meta.env.VITE_API_KEY}`,
      keepUnusedDataFor: 300,
    }),
    getCitySuggestions: builder.query({
      query: (city: string) =>
        `/geo/1.0/direct?q=${city}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`,
    }),
  }),
});

export const { useGetWeatherByLatLonQuery, useGetLocationByLatLonQuery, useGetWeatherByLocationQuery,useGetCitySuggestionsQuery } =
  weatherApiSlice;
