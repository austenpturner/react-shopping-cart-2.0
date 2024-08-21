import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { setUser } from "../store/slices/users-slice";

export default function useLogin() {
  const dispatch = useDispatch();

  async function handleUserLogin(email, password) {
    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      const { uid, userEmail, displayName } = userAuth.user;
      dispatch(
        setUser({
          id: uid,
          email: userEmail,
          username: displayName,
        })
      );
    } catch (error) {
      return error.code;
    }
  }

  return handleUserLogin;
}
