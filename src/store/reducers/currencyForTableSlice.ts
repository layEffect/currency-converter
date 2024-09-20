import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyData } from "../../types";
import { currencyAPI } from "../../api/api";
import { currencyData } from "../../assets/data/currencyData";

const initialState: CurrencyData[] = currencyData;

export const fetchCurrencyData = createAsyncThunk(
  "currency/fetchCurrencyDataForTable",
  async (_, { rejectWithValue }) => {
    try {
      const updatedCurrencies = await Promise.all(
        currencyData.map(async (currency) => {
          const ratio = await currencyAPI.getCurrency(
            currency.incomingCurrency.toLowerCase(),
            currency.outgoingCurrency.toLowerCase()
          );
          return {
            ...currency,
            ratio: ratio || 0,
          };
        })
      );

      return updatedCurrencies;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const currencyForTableSlice = createSlice({
  name: "currencyForTable",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCurrencyData.fulfilled,
      (state, action: PayloadAction<CurrencyData[]>) => {
        return action.payload;
      }
    );
  },
});

export default currencyForTableSlice.reducer;
