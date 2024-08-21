import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function setUserCart(userId, cart) {
  try {
    const userCartRef = doc(db, "users", userId);
    await setDoc(userCartRef, { cart }, { merge: true });
  } catch (error) {
    console.log(error);
  }
}

async function getUserCart(userId) {
  try {
    const userCartRef = doc(db, "users", userId);
    const cartSnap = await getDoc(userCartRef);
    if (cartSnap.exists()) {
      return cartSnap.data().cart;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateUserCart(userId, cart) {
  try {
    const userCartRef = doc(db, "users", userId);
    await updateDoc(userCartRef, { cart });
  } catch (error) {
    console.log(error);
  }
}

async function deleteUserCart(userId) {
  try {
    const userCartRef = doc(db, "users", userId);
    await deleteDoc(userCartRef);
  } catch (error) {
    console.log(error);
  }
}

export { setUserCart, getUserCart, updateUserCart, deleteUserCart };
