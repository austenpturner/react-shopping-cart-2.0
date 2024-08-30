import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductDetails from "../../components/productDetails";
import Button from "../../components/button";
import usePageSetup from "../../hooks/usePageSetup";
import { FaArrowLeftLong } from "react-icons/fa6";
import styles from "./product.module.scss";

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
    <div className={`page-container ${styles.productPage}`}>
      <Button
        handleAction={handleNavigateHome}
        type="navigate"
        icon={<FaArrowLeftLong />}
      />
      {loading ? (
        <p className="loading-message">Loading... </p>
      ) : (
        getProductDetailContent()
      )}
    </div>
  );
}
