import { createSlice } from "@reduxjs/toolkit";

function calculateTotal(items) {
  if (!Array.isArray(items)) {
    return 0;
  }
  const total = parseFloat(
    items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );
  return total;
}

function loadInitialCart() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    const parsedCart = JSON.parse(savedCart);
    return {
      items: parsedCart.items || [],
      total: parsedCart.total || 0,
    };
  }
  return { items: [], total: 0 };
}

const cartSlice = createSlice({
  name: "cart",
  initialState: loadInitialCart(),
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
      state.total = calculateTotal(state.items);
    },
    setCart(state, action) {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
        state.total = calculateTotal(action.payload);
      } else {
        state.items = action.payload.items;
        state.total = action.payload.total;
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.total = calculateTotal(state.items);
    },
    updateCartItem(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { setCart, addToCart, removeFromCart, updateCartItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
