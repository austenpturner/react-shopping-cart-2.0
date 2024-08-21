import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function useRegister() {
  async function handleUserRegister(email, password, userCredentials) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: userCredentials.name,
      });
      const cart = [];
      const cartRef = doc(db, "users", user.uid);
      await setDoc(cartRef, { cart });
      return null;
    } catch (error) {
      return error.code;
    }
  }

  return handleUserRegister;
}
