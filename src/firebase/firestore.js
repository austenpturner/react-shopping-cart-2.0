import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import firebase from "./firebaseConfig";

const db = firebase.db;

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

async function addFavorite(userId, productId) {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      favorites: arrayUnion(productId),
    });
  } catch (error) {
    console.log(`Error adding favorites`, error);
  }
}

async function removeFavorite(userId, productId) {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      favorites: arrayRemove(productId),
    });
  } catch (error) {
    console.log(`Error removing favorite`, error);
  }
}

async function getFavorites(userId) {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data().favorites || [];
  } else {
    console.error(`User document does not exist`);
    return [];
  }
}

export {
  setUserCart,
  getUserCart,
  updateUserCart,
  deleteUserCart,
  addFavorite,
  removeFavorite,
  getFavorites,
};
