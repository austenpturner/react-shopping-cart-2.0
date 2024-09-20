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

async function addFavoriteToFirestore(userId, item) {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      favorites: arrayUnion(item),
    });
  } catch (error) {
    console.log(`Error adding favorites`, error);
  }
}

async function removeFavoriteFromFirestore(userId, productId) {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      favorites: arrayRemove(productId),
    });
  } catch (error) {
    console.log(`Error removing favorite`, error);
  }
}

async function getFavoritesFromFirestore(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      // console.log(`firestore favorites:` userSnap.data().favorites);
      return userSnap.data().favorites;
    } else {
      return [];
    }
  } catch (error) {
    console.log(`Failed to get favorites from Firestore`, error);
  }
}

export {
  setUserCart,
  getUserCart,
  updateUserCart,
  deleteUserCart,
  addFavoriteToFirestore,
  removeFavoriteFromFirestore,
  getFavoritesFromFirestore,
};
