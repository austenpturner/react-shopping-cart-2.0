import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import firebase from "../firebase/firebaseConfig";
import { setUser } from "../store/slices/usersSlice";

export default function useLogin() {
  const dispatch = useDispatch();
  const auth = firebase.auth;

  async function handleUserLogin(email, password) {
    try {
      const userAuth = await signInWithEmailAndPassword(auth, email, password);
      const { uid, userEmail, displayName } = userAuth.user;
      const user = {
        id: uid,
        email: userEmail,
        username: displayName,
      };
      dispatch(setUser(user));
      return user;
    } catch (error) {
      return error.code;
    }
  }

  return handleUserLogin;
}
