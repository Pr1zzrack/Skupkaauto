import { createSlice } from "@reduxjs/toolkit";

const initialState = { detail: [] };
const DetailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    detailData(state, action) {
      state.detail = [...state.detail, action.payload];
    },
  },
});
export const { detailData } = DetailSlice.actions;
export default DetailSlice.reducer;
