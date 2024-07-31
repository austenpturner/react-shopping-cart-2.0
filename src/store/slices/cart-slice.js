import { createSlice } from "@reduxjs/toolkit";

function handleGetItems(key, defaultValue) {
  if (localStorage.getItem(key) !== null) {
    return JSON.parse(localStorage.getItem(key));
  }
  return defaultValue;
}

function handleSetItems(key, item) {
  localStorage.setItem(key, JSON.stringify(item));
}

const initialState = {
  cartItems: handleGetItems("cartItems", []),
  cartTotal: handleGetItems("cartTotal", 0),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      handleSetItems(
        "cartItems",
        state.cartItems.map((item) => item)
      );
    },
    removeFromCart(state, action) {
      state.cartItems.splice(action.payload, 1);
      handleSetItems(
        "cartItems",
        state.cartItems.map((item) => item)
      );
    },
    increaseCartQuantity(state, action) {
      state.cartItems.splice(action.payload, 1, {
        ...state.cartItems[action.payload],
        quantity: state.cartItems[action.payload].quantity + 1,
      });
      handleSetItems(
        "cartItems",
        state.cartItems.map((item) => item)
      );
    },
    decreaseCartQuantity(state, action) {
      state.cartItems.splice(action.payload, 1, {
        ...state.cartItems[action.payload],
        quantity: state.cartItems[action.payload].quantity - 1,
      });
      handleSetItems(
        "cartItems",
        state.cartItems.map((item) => item)
      );
    },
    updateCartTotal(state, action) {
      state.cartTotal = parseFloat(
        (state.cartTotal + action.payload).toFixed(2)
      );
      handleSetItems("cartTotal", state.cartTotal);
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
