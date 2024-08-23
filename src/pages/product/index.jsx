import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductDetails from "../../components/productDetails";
import Button from "../../components/button";
import usePageSetup from "../../hooks/usePageSetup";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { data, loadingData } = useFetch(
    `https://dummyjson.com/products/${id}`
  );
  const { loading } = usePageSetup(data, loadingData);

  function handleNavigateHome() {
    navigate("/");
  }

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
