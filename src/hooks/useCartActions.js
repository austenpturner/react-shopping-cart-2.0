import { useDispatch, useSelector } from "react-redux";
import { updateUserCart } from "../firebase/firestore";
import {
  addToCart,
  removeFromCart,
  updateCartItem,
} from "../store/slices/cartSlice";
import { useContext } from "react";
import { UIContext } from "../context/uiContext";

export default function useCartActions() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.users.currentUser);
  const { uiDispatch } = useContext(UIContext);

  function setButtonText(id, text) {
    uiDispatch({ type: "SET_BUTTON_TEXT", payload: { id, text } });
    setTimeout(() => {
      uiDispatch({ type: "SET_BUTTON_INITIAL_STATE" });
    }, 1000);
  }

  async function updateCartInFirestore(updatedItems, id) {
    let updateSuccessful = false;
    if (user) {
      try {
        await updateUserCart(user.id, updatedItems);
        updateSuccessful = true;
      } catch (error) {
        console.log(`Failed to update firestore cart`, error);
      }
    } else {
      updateSuccessful = true;
    }
    if (updateSuccessful && id) {
      setButtonText(id, "Added!");
    }
  }

  function getUpdatedItems(type, item) {
    let newQuantity;

    if (type === "increase") {
      newQuantity = item.quantity + 1;
    } else if (type === "decrease") {
      newQuantity = item.quantity - 1;
    }

    const updatedCartItem = {
      ...item,
      quantity: newQuantity,
    };
    const updatedItems = cartItems.map((cartItem) =>
      cartItem.id === item.id ? updatedCartItem : cartItem
    );

    return { updatedCartItem, updatedItems };
  }

  function handleAddToCart(product) {
    const { id, name, price } = product;
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      handleUpdateQuantity(existingItem, "increase");
    } else {
      const newItem = { id, name, price, quantity: 1 };
      const updatedItems = [...cartItems, newItem];
      dispatch(addToCart(newItem));
      updateCartInFirestore(updatedItems, id);
    }
  }

  async function handleRemoveFromCart(item) {
    const updatedItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    dispatch(removeFromCart(item));
    updateCartInFirestore(updatedItems);
  }

  function handleUpdateQuantity(item, type) {
    let newFirestoreCart;

    if (type === "increase") {
      const { updatedCartItem, updatedItems } = getUpdatedItems(type, item);
      newFirestoreCart = updatedItems;
      dispatch(updateCartItem(updatedCartItem));
    } else if (type === "decrease" && item.quantity === 1) {
      newFirestoreCart = cartItems.filter(
        (cartItem) => cartItem.id !== item.id
      );
      dispatch(removeFromCart(item));
    } else {
      const { updatedCartItem, updatedItems } = getUpdatedItems(type, item);
      newFirestoreCart = updatedItems;
      dispatch(updateCartItem(updatedCartItem));
    }
    updateCartInFirestore(newFirestoreCart, item.id);
  }

  return { handleAddToCart, handleUpdateQuantity, handleRemoveFromCart };
}
