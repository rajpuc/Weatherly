import { configureStore } from '@reduxjs/toolkit';
import  themeReducer  from '../features/theme/themeSlice';
import { weatherApiSlice } from '../features/weather/weatherApiSlice';

export const store = configureStore({
  reducer: {
    [weatherApiSlice.reducerPath]:weatherApiSlice.reducer,
    theme : themeReducer
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(weatherApiSlice.middleware),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch