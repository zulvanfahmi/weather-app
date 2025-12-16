import { fetchLocation } from "@/services/LocationService";
import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    lat: null as number | null,
    lon: null as number | null,
    loadingLocation: false,
    errorLocation: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.loadingLocation = true;
        state.errorLocation = null;
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.loadingLocation = false;
        state.lat = action.payload.lat;
        state.lon = action.payload.lon;
        state.errorLocation = null;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.loadingLocation = false;
        state.errorLocation = action.payload as string;
      });
  },
});

export default locationSlice.reducer;