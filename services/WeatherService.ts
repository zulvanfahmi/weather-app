import OPENWEATHER_API_KEY from "@/constants/OPENWEATHER_API_KEY";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    {
      lat,
      lon,
      units,
      lang,
    }: {
      lat: number;
      lon: number;
      units: string;
      lang: string;
    }) => {
    const API_ID = OPENWEATHER_API_KEY();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_ID}`
    );

    if (!res.ok) throw new Error("Failed to fetch weather");

    return await res.json();
  }
);

export const fetchforecast = createAsyncThunk(
  "weather/fetchForecast",
  async (
    {
      lat,
      lon,
      units,
      lang,
    }: {
      lat: number;
      lon: number;
      units: string;
      lang: string;
    }) => {
    const API_ID = OPENWEATHER_API_KEY();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_ID}&units=${units}&lang=${lang}`
    );

    if (!res.ok) throw new Error("Failed to fetch forecast");

    return await res.json();
  }
);