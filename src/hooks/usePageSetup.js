import { useSelector } from "react-redux";
import useFetchCart from "./useFetchCart";
import { useState } from "react";
import { useEffect } from "react";
import useFetchFavorites from "./useFetchFavorites";

export default function usePageSetup(data, dataLoaded) {
  const cartLoaded = useFetchCart();
  const favoritesLoaded = useFetchFavorites();
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.favorites.favorites);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      cartLoaded &&
      favoritesLoaded &&
      cartItems &&
      favorites &&
      data &&
      dataLoaded
    ) {
      setLoading(false);
    }
  }, [cartLoaded, favoritesLoaded, cartItems, favorites, data, dataLoaded]);

  return { loading, cartItems, favorites };
}
