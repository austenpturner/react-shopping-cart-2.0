import { useEffect, useState } from "react";
import { getUserCart } from "../firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../store/slices/cartSlice";
import useAuth from "./useAuth";

export default function useFetchCart() {
  const dispatch = useDispatch();
  useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const syncing = useSelector((state) => state.cart.syncing);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    if (user && !syncing) {
      const fetchCart = async () => {
        try {
          const cart = await getUserCart(user.id);

          if (cart) {
            dispatch(setCart(cart));
          }
        } catch (error) {
          console.log(error);
        } finally {
          setCartLoaded(true);
        }
      };
      fetchCart();
    } else {
      setCartLoaded(true);
    }
  }, [user, dispatch, syncing]);

  return cartLoaded;
}
