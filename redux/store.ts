// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import forecastReducer from "./slices/forecastSlice";
import languageReducer from "./slices/languageSlice";
import locationReducer from "./slices/locationSlice";
import temperatureUnitSlice from "./slices/temperatureUnitSlice";
import timeFormatReducer from "./slices/timeFormatSlice";
import weatherReducer from "./slices/weatherSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    language: languageReducer,
    temperatureUnit: temperatureUnitSlice,
    timeFormat: timeFormatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
