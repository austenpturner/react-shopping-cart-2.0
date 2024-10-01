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

  function createItem(product) {
    const { id, title, thumbnail, price, rating, description } = product;
    const item = {
      id,
      title,
      thumbnail,
      price,
      rating,
      description,
    };
    return item;
  }

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

  async function handleAddToFavorites(product, loginUser) {
    try {
      const item = createItem(product);
      if (loginUser || user) {
        dispatch(addToFavoritesSlice(item));
      }
      if (loginUser) {
        await addFavoriteToFirestore(loginUser.id, item);
      } else if (user) {
        await addFavoriteToFirestore(user.id, item);
      }
    } catch (error) {
      console.log(`Failed to add to favorites`, error);
    }
  }

  async function handleRemoveFromFavorites(product) {
    if (user) {
      const item = createItem(product);
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
