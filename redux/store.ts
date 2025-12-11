// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import forecastReducer from "./slices/forecastSlices";
import locationReducer from "./slices/locationSlices";
import weatherReducer from "./slices/weatherSlices";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    weather: weatherReducer,
    forecast: forecastReducer
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
