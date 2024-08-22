import ProductCard from "../../components/productCard";
// import { products } from "../../config/productsConfig";
import useFetchCart from "../../hooks/useFetchCart";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./styles.css";
import useFetch from "../../hooks/useFetch";

export default function HomePage() {
  const cartLoaded = useFetchCart();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const { data, loadingData } = useFetch(`https://dummyjson.com/products/`);
  // console.log(data.products.length, loadingData);

  useEffect(() => {
    if (cartLoaded && cartItems && data?.products?.length > 0 && !loadingData) {
      setLoading(false);
    }
  }, [cartLoaded, cartItems, data, loadingData]);

  const productList = (
    <ul className="product-list">
      {data?.products?.length > 0 ? (
        data.products.map((product) => {
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
