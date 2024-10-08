import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebase from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function useRegister() {
  const { auth, db } = firebase;
  async function handleUserRegister(email, password, userCredentials) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${userCredentials.firstname} ${userCredentials.lastname}`,
      });
      const cart = [];
      const cartRef = doc(db, "users", user.uid);
      await setDoc(cartRef, { cart });
      return null;
    } catch (error) {
      console.log(error.code);
      return error.code;
    }
  }

  return handleUserRegister;
}
