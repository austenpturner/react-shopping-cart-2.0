import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/usersSlice";
import cartReducer from "./slices/cartSlice";
import { cartMiddleware } from "../middleware/cartMiddleware";

const store = configureStore({
  reducer: {
    users: usersReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(cartMiddleware),
});

export default store;
