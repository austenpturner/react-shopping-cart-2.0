import { useDispatch } from "react-redux";
import firebase from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { setUser } from "../store/slices/usersSlice";
import { clearCart } from "../store/slices/cartSlice";

export default function useLogout() {
  const dispatch = useDispatch();
  const auth = firebase.auth;

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
