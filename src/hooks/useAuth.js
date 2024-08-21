import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../store/slices/users-slice";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkForUser = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            id: currentUser.uid,
            email: currentUser.email,
            username: currentUser.displayName,
          })
        );
      } else {
        dispatch(setUser(null));
      }
      setLoading(false);
    });

    return () => checkForUser();
  }, [auth, dispatch]);

  return loading;
}
