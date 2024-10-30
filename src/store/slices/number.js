import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: "+996501965793",
};

const RegisterNumber = createSlice({
  name: "number",
  initialState,
  reducers: {
    storeNumber(state, action) {
      state.number = action.payload;
    },
  },
});

export const { storeNumber } = RegisterNumber.actions;
export default RegisterNumber.reducer;
