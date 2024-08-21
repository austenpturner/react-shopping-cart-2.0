export const cartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  const user = state.users.currentUser;
  const cartItems = state.cart.items;
  const cartTotal = state.cart.total;

  if (!user && action.type.startsWith("cart/")) {
    localStorage.setItem(
      "cart",
      JSON.stringify({ items: cartItems, total: cartTotal })
    );
  }

  return result;
};
