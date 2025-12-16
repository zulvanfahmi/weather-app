import { fetchWeather } from "@/services/WeatherService";
import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    currentWeather: null as any | null,
    loadingWeather: false,
    errorWeather: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loadingWeather = true;
        state.errorWeather = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loadingWeather = false;
        state.currentWeather = action.payload;
        state.errorWeather = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loadingWeather = false;
        state.errorWeather =
          action.error.message || "Failed to fetch weather";
      });
  },
});


export default weatherSlice.reducer;
