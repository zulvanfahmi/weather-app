import { fetchforecast } from "@/services/WeatherService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const forecastSlice = createSlice({
    name: "forecast",
    initialState: {
        forecast: null as any | null,
        loadingForecast: false,
        errorForecast: null as string | null,
        isForecastLoadedBySearch: false,
    },
    reducers: {
    setIsForecastLoadedBySearch(state, action: PayloadAction<boolean>) {
      state.isForecastLoadedBySearch = action.payload;
    }
  },
    extraReducers: (builder) => {
        builder
            .addCase(fetchforecast.pending, (state) => {
                state.loadingForecast = true;
                state.errorForecast = null;
            })
            .addCase(fetchforecast.fulfilled, (state, action) => {
                state.loadingForecast = false;
                state.forecast = action.payload;
                state.errorForecast = null;
            })
            .addCase(fetchforecast.rejected, (state, action) => {
                state.loadingForecast = false;
                state.errorForecast =
                    action.error.message || "Failed to fetch forecast";
            });
    },
});

export const { setIsForecastLoadedBySearch } = forecastSlice.actions;
export default forecastSlice.reducer;
