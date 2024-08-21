import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { setUser } from "../store/slices/users-slice";
import { clearCart } from "../store/slices/cart-slice";

export default function useLogout() {
  const dispatch = useDispatch();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        dispatch(clearCart());
        localStorage.removeItem("cart");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return handleLogout;
}
