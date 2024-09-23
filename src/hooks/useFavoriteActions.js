import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteToFirestore,
  getFavoritesFromFirestore,
  removeFavoriteFromFirestore,
} from "../firebase/firestore";
import {
  addToFavoritesSlice,
  removeFromFavoritesSlice,
  setFavoritesSlice,
} from "../store/slices/favoritesSlice";

export default function useFavoriteActions() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);

  async function handleFetchFavorites() {
    if (user) {
      try {
        const favorites = await getFavoritesFromFirestore(user.id);
        dispatch(setFavoritesSlice(favorites));
      } catch (error) {
        console.log(`Failed to fetch and set favorites`, error);
      }
    }
  }

  async function handleAddToFavorites(product) {
    if (user) {
      try {
        const { id, title, thumbnail } = product;
        const item = {
          id,
          title,
          thumbnail,
        };
        dispatch(addToFavoritesSlice(item));
        addFavoriteToFirestore(user.id, item);
      } catch (error) {
        console.log(`Failed to add to favorites`, error);
      }
    }
  }

  async function handleRemoveFromFavorites(product) {
    if (user) {
      const { id, title, thumbnail } = product;
      const item = {
        id,
        title,
        thumbnail,
      };
      try {
        dispatch(removeFromFavoritesSlice(item));
        removeFavoriteFromFirestore(user.id, item);
      } catch (error) {
        console.log(`Failed to remove from favorites`, error);
      }
    }
  }

  return {
    handleFetchFavorites,
    handleAddToFavorites,
    handleRemoveFromFavorites,
  };
}
