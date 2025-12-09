// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlices";

export const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
