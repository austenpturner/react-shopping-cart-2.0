import ProductCard from "../../components/productCard";
// import useFetchCart from "../../hooks/useFetchCart";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
import "./styles.scss";
import useFetch from "../../hooks/useFetch";
import usePageSetup from "../../hooks/usePageSetup";

export default function HomePage() {
  const { data, loadingData } = useFetch(`https://dummyjson.com/products/`);
  const { loading } = usePageSetup(data?.products?.length > 0, loadingData);

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
