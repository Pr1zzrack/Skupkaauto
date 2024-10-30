import { createSlice } from "@reduxjs/toolkit";

const initialState = { priceFiltr: [], carMileageFiltr: [] };
const FiltrSlice = createSlice({
  name: "filtr",
  initialState,
  reducers: {
    filtrPrice(state, action) {
      state.priceFiltr = [...state.priceFiltr, action.payload];
    },
    mileageFiltr(state, action) {
      state.carMileageFiltr = [...state.carMileageFiltr, action.payload];
    },
  },
});
export const { filtrPricer, mileageFiltr } = FiltrSlice.actions;
export default FiltrSlice.reducer;
