import { useSelector } from "react-redux";
import useFetchCart from "./useFetchCart";
import { useState } from "react";
import { useEffect } from "react";

export default function usePageSetup(data, loadingData) {
  const cartLoaded = useFetchCart();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cartLoaded && cartItems && data && !loadingData) {
      setLoading(false);
    }
  }, [cartLoaded, cartItems, data, loadingData]);

  return { loading, cartItems };
}
