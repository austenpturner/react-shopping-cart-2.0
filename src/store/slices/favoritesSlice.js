import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavoritesSlice(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
    setFavoritesSlice(state, action) {
      console.log(`setting redux favorites`, action.payload);

      state = action.payload;
    },
    removeFromFavoritesSlice(state, action) {
      state.delete(action.payload);
    },
    clearFavoritesSlice(state, action) {
      state = action.payload || [];
    },
  },
});

export const {
  addToFavoritesSlice,
  setFavoritesSlice,
  removeFromFavoritesSlice,
  clearFavoritesSlice,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
