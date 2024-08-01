import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const apiKey = import.meta.env.FIREBASE_API_KEY;
const messagingSenderId = import.meta.env.MESSAGING_SENDER_ID;
const appId = import.meta.env.APP_ID;
const measurementId = import.meta.env.MEASUREMENT_ID;

const firebaseConfig = {
  apiKey,
  authDomain: "react-shopping-cart-2.firebaseapp.com",
  projectId: "react-shopping-cart-2",
  storageBucket: "react-shopping-cart-2.appspot.com",
  messagingSenderId,
  appId,
  measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
