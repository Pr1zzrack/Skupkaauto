import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorite: [],
  countFav: 0,
};

const LikeSlice = createSlice({
  name: "Like",
  initialState,
  reducers: {
    addFavorite(state, action) {
      const exists = state.favorite.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.favorite.push(action.payload);
        state.countFav += 1;
      }
    },
    removeFavorite(state, action) {
      state.favorite = state.favorite.filter(
        (item) => item.id !== action.payload.id
      );
      state.countFav -= 1;
    },
  },
});

export const { addFavorite, removeFavorite } = LikeSlice.actions;
export default LikeSlice.reducer;
