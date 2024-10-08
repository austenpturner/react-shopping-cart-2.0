import { createSlice } from "@reduxjs/toolkit";
import { getTotal } from "../../util/getTotal";

function loadInitialCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    return {
      items: parsedCart.items || [],
      total: parsedCart.total || 0,
      syncing: false,
    };
  }
  return { items: [], total: 0, syncing: false };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: loadInitialCart(),
  reducers: {
    addToCart(state, action) {
      state.items.push(action.payload);
      state.total = getTotal(state.items);
    },
    setCart(state, action) {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.total = getTotal(action.payload);
      } else {
        state.items = action.payload.items;
        state.total = action.payload.total;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.total = getTotal(state.items);
    },
    updateCartItem(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
        state.total = getTotal(state.items);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
    setSyncing(state, action) {
      state.syncing = action.payload;
    },
  },
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  setSyncing,
} = cartSlice.actions;

export default cartSlice.reducer;
