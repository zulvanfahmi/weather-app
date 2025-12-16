import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const temperatureUnitSlice = createSlice({
  name: "metrics",
  initialState: {
    unitNameGlobal: "Celcius" as "Celcius" | 'Fahrenheit' | 'Kelvin',
    units: "metric" as "metric" | "imperial" | "standard",
    unitSymbol: "C" as "C" | "F" | "K",
  },
  reducers: {
    setMetricsGlobal(
      state,
      action: PayloadAction<"Celcius" | 'Fahrenheit' | 'Kelvin'>
    ) {
      state.unitNameGlobal = action.payload;

      if (action.payload === "Celcius") {
        state.unitSymbol = "C";
        state.units = 'metric';
      } else if (action.payload === "Fahrenheit") {
        state.unitSymbol = "F";
        state.units = 'imperial';
      } else {
        state.unitSymbol = "K";
        state.units = 'standard';
      }
    },
  },
});

export const { setMetricsGlobal } = temperatureUnitSlice.actions;
export default temperatureUnitSlice.reducer;
