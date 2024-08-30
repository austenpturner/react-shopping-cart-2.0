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
        console.log(favorites);
        dispatch(setFavoritesSlice(favorites));
      } catch (error) {
        console.log(`Failed to fetch and set favorites`, error);
      }
    }
  }

  //   async function updateFavoritesInFirestore(updatedFavoritesSet) {
  //     if (user) {
  //         try {
  //             const updatedFavoritesArray = Array.from(updatedFavoritesSet);
  //             await updateFirestoreFavorites(user.id, updatedFavoritesArray)
  //         } catch (error) {
  //             console.log(`Failed to update Firestore favorites`, error);

  //         }
  //     }
  //   }

  async function handleAddToFavorites(product) {
    if (user) {
      try {
        const { id, title, thumbnail } = product;
        const item = {
          id,
          title,
          thumbnail,
        };
        console.log(item);
        dispatch(addToFavoritesSlice(item));
        addFavoriteToFirestore(user.id, item);
      } catch (error) {
        console.log(`Failed to add to favorites`, error);
      }
    }
  }

  async function handleRemoveFromFavorites(item) {
    if (user) {
      try {
        dispatch(removeFromFavoritesSlice(item));
        removeFavoriteFromFirestore(user.id, item.id);
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
