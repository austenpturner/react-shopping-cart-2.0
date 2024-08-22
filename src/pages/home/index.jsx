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

  const productList = (
    <ul className="product-list">
      {products?.length ? (
        products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })
      ) : (
        <p>no products found.</p>
      )}
    </ul>
  );

  return (
    <div className="page-container home-page">
      <h1 className="page-header home-page-header">Products</h1>
      {loading ? <p className="page-loading">Loading... </p> : productList}
    </div>
  );
}
