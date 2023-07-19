import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IProduct {
  status: boolean;
  priceRange: number;
}

const initialState: IProduct = {
  status: false,
  priceRange: 150,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    toggleStatus: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { toggleStatus, setPriceRange } = bookSlice.actions;

export default bookSlice.reducer;
