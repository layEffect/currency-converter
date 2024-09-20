import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { currencyAPI } from "../../api/api";

interface ConverterState {
  firstCurrency: string;
  secondCurrency: string;
  firstAmount: number;
  secondAmount: number;
  conversionRatio: number;
}

const initialState: ConverterState = {
  firstCurrency: "USD",
  secondCurrency: "UAH",
  firstAmount: 1,
  secondAmount: 0,
  conversionRatio: 0,
};

export const fetchConversionRatio = createAsyncThunk(
  "converter/fetchConversionRatio",
  async ({
    firstCurrency,
    secondCurrency,
  }: {
    firstCurrency: string;
    secondCurrency: string;
  }) => {
    const ratio = await currencyAPI.getCurrency(
      firstCurrency.toLowerCase(),
      secondCurrency.toLowerCase()
    );
    return ratio || 0;
  }
);

const converterSlice = createSlice({
  name: "converter",
  initialState,
  reducers: {
    setFirstAmount(state, action: PayloadAction<number>) {
      state.firstAmount = action.payload;
      state.secondAmount = action.payload * state.conversionRatio;
    },
    setSecondAmount(state, action: PayloadAction<number>) {
      state.secondAmount = action.payload;
      state.firstAmount = action.payload / state.conversionRatio;
    },
    setFirstCurrency(state, action: PayloadAction<string>) {
      state.firstCurrency = action.payload;
    },
    setSecondCurrency(state, action: PayloadAction<string>) {
      state.secondCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchConversionRatio.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.conversionRatio = action.payload;
        state.secondAmount = state.firstAmount * state.conversionRatio;
      }
    );
  },
});

export const {
  setFirstAmount,
  setSecondAmount,
  setFirstCurrency,
  setSecondCurrency,
} = converterSlice.actions;

export default converterSlice.reducer;
