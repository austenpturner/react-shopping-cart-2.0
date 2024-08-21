import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { setUser } from "../store/slices/users-slice";

export default function useLogout() {
  const dispatch = useDispatch();

  function handleLogout() {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        dispatch(clearCart()); //! set up reducer in cart slice
        localStorage.removeItem("cart");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return handleLogout;
}
