import { fetchforecast } from "@/services/WeatherService";
import { createSlice } from "@reduxjs/toolkit";

const forecastSlice = createSlice({
    name: "forecast",
    initialState: {
        forecast: null as any | null,
        loadingForecast: false,
        errorForecast: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchforecast.pending, (state) => {
                state.loadingForecast = true;
                state.forecast = null;
                state.errorForecast = null;
            })
            .addCase(fetchforecast.fulfilled, (state, action) => {
                state.loadingForecast = false;
                state.forecast = action.payload;
                state.errorForecast = null;
            })
            .addCase(fetchforecast.rejected, (state, action) => {
                state.loadingForecast = false;
                state.forecast = null;
                state.errorForecast = action.error.message || "Failed to fetch weather";
            });
    },
});

export default forecastSlice.reducer;
