import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const total =
  localStorage.getItem("cartTotal") !== null
    ? JSON.parse(localStorage.getItem("cartTotal"))
    : 0;

const initialState = {
  cartItems: items,
  cartTotal: total,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
    removeFromCart(state, action) {
      state.cartItems.splice(action.payload, 1);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
    increaseCartQuantity(state, action) {
      state.cartItems.splice(action.payload, 1, {
        ...state.cartItems[action.payload],
        quantity: state.cartItems[action.payload].quantity + 1,
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
    decreaseCartQuantity(state, action) {
      state.cartItems.splice(action.payload, 1, {
        ...state.cartItems[action.payload],
        quantity: state.cartItems[action.payload].quantity - 1,
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.cartItems.map((item) => item))
      );
    },
    updateCartTotal(state, action) {
      state.cartTotal = parseFloat(
        (state.cartTotal + action.payload).toFixed(2)
      );
      localStorage.setItem("cartTotal", JSON.stringify(state.cartTotal));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  updateCartTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
