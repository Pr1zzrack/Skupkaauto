import { configureStore } from "@reduxjs/toolkit";
import data from "./slices/data";
import like from "./slices/like";
import number from "./slices/number";
import filtr from "./slices/filtr";

export const store = configureStore({
  reducer: {
    data,
    like,
    number,
    filtr,
  },
});
