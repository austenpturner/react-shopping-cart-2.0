import ProductCard from "../../components/productCard";
import "./styles.scss";
import useFetch from "../../hooks/useFetch";
import usePageSetup from "../../hooks/usePageSetup";
import { PulseLoader } from "react-spinners";

export default function HomePage() {
  const { data, dataLoaded } = useFetch(`https://dummyjson.com/products/`);
  const { loading } = usePageSetup(data?.products?.length > 0, dataLoaded);

  const productList = (
    <ul className="product-list">
      {data?.products?.length > 0 ? (
        data.products.map((product) => {
          return (
            <ProductCard key={product.id} product={product} parent="products" />
          );
        })
      ) : (
        <p>no products found.</p>
      )}
    </ul>
  );

  return (
    <div className="page-container home-page">
      <h1 className="page-header home-page-header">Products</h1>
      {loading ? (
        <PulseLoader color="#a0a0a0" margin={1} size={12} />
      ) : (
        productList
      )}
    </div>
  );
}
