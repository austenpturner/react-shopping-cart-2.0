import ProductCard from "../../components/product-card";
import useFetch from "../../hooks/useFetch";
import "./styles.css";

export default function ProductListPage() {
  const { data, loading } = useFetch("https://dummyjson.com/products");

  // console.log(data);

  if (loading) {
    return (
      <div className="page">
        <h1>Product List</h1>
        <h3 className="loading-msg">Loading products... </h3>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Product List</h1>
      <div className="productListContainer">
        {data?.products?.length > 0 ? (
          data?.products?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}
