import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cart-slice";
import usersReducer from "./slices/users-slice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    users: usersReducer,
  },
});

export default store;
