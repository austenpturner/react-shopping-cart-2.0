import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cartItems.splice(action.payload, 1);
    },
    increaseCartQuantity(state, action) {
      state.cartItems.splice(action.payload, 1, {
        ...state.cartItems[action.payload],
        quantity: state.cartItems[action.payload].quantity + 1,
      });
    },
    decreaseCartQuantity(state, action) {
      state.cartItems.splice(action.payload, 1, {
        ...state.cartItems[action.payload],
        quantity: state.cartItems[action.payload].quantity - 1,
      });
    },
    updateCartTotal(state, action) {
      state.cartTotal = parseFloat(
        (state.cartTotal + action.payload).toFixed(2)
      );
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
