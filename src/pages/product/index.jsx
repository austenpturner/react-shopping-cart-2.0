import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductDetails from "../../components/productDetails";
import Button from "../../components/button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useFetchCart from "../../hooks/useFetchCart";

export default function ProductPage() {
  const cartLoaded = useFetchCart();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { data, loadingData } = useFetch(
    `https://dummyjson.com/products/${id}`
  );

  function handleNavigateHome() {
    navigate("/");
  }

  useEffect(() => {
    if (!cartLoaded && loadingData) {
      setLoading(true);
    } else if (cartLoaded && cartItems.length === 0 && data) {
      setTimeout(() => {
        setLoading(false);
      }, "1500");
    } else if (cartLoaded && cartItems.length > 0 && data) {
      setLoading(false);
    }
  }, [cartLoaded, cartItems, loadingData, data]);

  // console.log(data);

  function getProductDetailContent() {
    if (data) {
      return <ProductDetails product={data} />;
    } else {
      return <p>No details found</p>;
    }
  }

  return (
    <div className="page-container">
      <Button
        handleAction={handleNavigateHome}
        type="navigate"
        text="back to products"
      />
      {loading ? (
        <p className="loading-message">Loading... </p>
      ) : (
        getProductDetailContent()
      )}
    </div>
  );
}
