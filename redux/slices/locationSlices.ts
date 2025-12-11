import { fetchLocation } from "@/services/LocationService";
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    // lat: null as number | null,
    // lon: null as number | null,
    lat: 0,
    lon: 0,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lat = 0;
        state.lon = 0;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.lat = action.payload.lat;
        state.lon = action.payload.lon;
        state.error = null;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.lat = 0;
        state.lon = 0;
      });
  },
});

export default locationSlice.reducer;