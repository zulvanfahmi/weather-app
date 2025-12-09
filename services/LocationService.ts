import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Location from "expo-location";

export const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
  async (_, thunkAPI) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return thunkAPI.rejectWithValue("Permission denied");
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      return {
        lat: loc.coords.latitude,
        lon: loc.coords.longitude,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Error getting location" + err);
    }
  }
);