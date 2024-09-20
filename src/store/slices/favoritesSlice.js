import { createSlice } from "@reduxjs/toolkit";

const initialState = { favorites: [] };

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavoritesSlice(state, action) {
      console.log(action.payload);
      state.favorites.push(action.payload);
    },
    setFavoritesSlice(state, action) {
      console.log(`setting redux favorites`, action.payload);

      state.favorites = action.payload;
    },
    removeFromFavoritesSlice(state, action) {
      state.favorites.delete(action.payload);
    },
    clearFavoritesSlice(state, action) {
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
