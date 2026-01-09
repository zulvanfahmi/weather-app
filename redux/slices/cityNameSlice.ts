import { fetchCityName } from "@/services/CityNameService";
import { createSlice } from "@reduxjs/toolkit";

const cityNameSlice = createSlice({
    name: "cityName",
    initialState: {
        cityName: [] as any[],
        loadingCityName: false,
        errorCityName: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCityName.pending, (state) => {
                state.loadingCityName = true;
                state.errorCityName = null;
            })
            .addCase(fetchCityName.fulfilled, (state, action) => {
                state.loadingCityName = false;
                state.cityName = action.payload;
                state.errorCityName = null;
            })
            .addCase(fetchCityName.rejected, (state, action) => {
                state.loadingCityName = false;
                state.errorCityName =
                    action.error.message || "Failed to fetch city name";
            });
    },
});

export default cityNameSlice.reducer;
