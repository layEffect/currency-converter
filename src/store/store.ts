import { configureStore } from "@reduxjs/toolkit";
import currencyForTableReducer from "./reducers/currencyForTableSlice";
import converterReducer from "./reducers/converterSlice";

export const store = configureStore({
  reducer: {
    currencyForTable: currencyForTableReducer,
    converter: converterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
