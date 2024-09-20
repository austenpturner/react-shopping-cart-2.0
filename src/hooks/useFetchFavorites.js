import { useEffect, useState } from "react";
import { getFavoritesFromFirestore } from "../firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "./useAuth";
import { setFavoritesSlice } from "../store/slices/favoritesSlice";

export default function useFetchFavorites() {
  const dispatch = useDispatch();
  useAuth();
  const user = useSelector((state) => state.users.currentUser);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  async function fetchFavorites() {
    try {
      const favorites = await getFavoritesFromFirestore(user.id);
      //   console.log(favorites);

      if (favorites) {
        dispatch(setFavoritesSlice(favorites));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFavoritesLoaded(true);
    }
  }

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user, dispatch]);

  return favoritesLoaded;
}
