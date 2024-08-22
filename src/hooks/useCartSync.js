import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, setUserCart } from "../firebase/firestore";
import { setCart } from "../store/slices/cartSlice";

export default function useCartSync() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) => state.cart.total);

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

  function mergeCarts(cart, mergedCart) {
    cart.forEach((item) => {
      if (mergedCart.has(item.id)) {
        const existingItem = mergedCart.get(item.id);
        mergedCart.set(item.id, {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        });
      } else {
        mergedCart.set(item.id, item);
      }
    });
  }

  function handleCombineItems(localCartItems, firestoreCart) {
    if (localCartItems.length === 0) return firestoreCart;
    if (firestoreCart.length === 0) return localCartItems;

    const mergedCartMap = new Map();
    mergeCarts(localCartItems, mergedCartMap);
    mergeCarts(firestoreCart, mergedCartMap);

    return Array.from(mergedCartMap.values());
  }

  useEffect(() => {
    async function syncCartWithFirestore() {
      try {
        const localCart = JSON.parse(localStorage.getItem("cart")) || {
          items: [],
        };
        const firestoreCart = (await getUserCart(user.id)) || [];
        const combinedItems = handleCombineItems(
          localCart.items,
          firestoreCart
        );
        const combinedCart = {
          items: combinedItems,
          total: calculateTotal(combinedItems),
        };

        dispatch(setCart(combinedCart));
        await setUserCart(user.id, combinedItems);
        localStorage.removeItem("cart");
      } catch (error) {
        console.log(error);
      }
    }
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem("cart"));
      if (localCart) {
        dispatch(setCart(localCart));
      }
    } else {
      syncCartWithFirestore();
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem(
        "cart",
        JSON.stringify({
          items: cartItems,
          total: cartTotal,
        })
      );
    }
  }, [user, cartItems, cartTotal]);
}
