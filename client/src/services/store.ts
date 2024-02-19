import {configureStore} from "@reduxjs/toolkit";
import {sharesSlice} from "./features";

export const store = configureStore({
  reducer: {
    shares: sharesSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
