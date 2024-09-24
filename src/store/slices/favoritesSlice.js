import { createSlice } from "@reduxjs/toolkit";

const initialState = { favorites: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavoritesSlice(state, action) {
      state.favorites.push(action.payload);
    },
    setFavoritesSlice(state, action) {
      state.favorites = action.payload;
    },
    removeFromFavoritesSlice(state, action) {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearFavoritesSlice(state, action) {
      console.log(`clearing favorites slice`);
      state.favorites = action.payload || [];
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
