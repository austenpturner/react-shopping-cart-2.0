import ProductCard from "../../components/productCard";
import { products } from "../../config/productsConfig";
import useFetchCart from "../../hooks/useFetchCart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";

export default function HomePage() {
  const cartLoaded = useFetchCart();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cartLoaded && cartItems) {
      setLoading(false);
    }
  }, [cartLoaded, cartItems]);

  if (loading) {
    return (
      <div>
        <h1>Home Page</h1>
        <p>Loading... </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Products</h1>
      <ul className="product-list">
        {products?.length ? (
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        ) : (
          <p>no products found.</p>
        )}
      </ul>
    </div>
  );
}
