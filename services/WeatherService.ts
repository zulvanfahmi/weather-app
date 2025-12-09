import OPENWEATHER_API_KEY from "@/constants/OPENWEATHER_API_KEY";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export async function getCurrentWeather(lat: number, lon: number) {

    const API_ID = OPENWEATHER_API_KEY();

  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_ID}&units=metric`
  );
}

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async ({ lat, lon }: { lat: number; lon: number }) => {

    const API_ID = OPENWEATHER_API_KEY();

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_ID}`
    );
    return await res.json();
  }
);

export async function getForecast5Days(lat: number, lon: number) {

  const API_ID = OPENWEATHER_API_KEY();

  return axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_ID}&units=metric`
  )

}