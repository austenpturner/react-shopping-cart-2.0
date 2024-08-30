import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartSlice";
import favoritesReducer from "./slices/favoritesSlice";
import { cartMiddleware } from "../middleware/cartMiddleware";
import { enableMapSet } from "immer";

enableMapSet();

const store = configureStore({
  reducer: {
    users: usersReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(cartMiddleware),
});

export default store;
