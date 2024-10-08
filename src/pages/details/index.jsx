import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductDetails from "../../components/productDetails";
import Button from "../../components/button";
import usePageSetup from "../../hooks/usePageSetup";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./styles.scss";
import { useEffect, useState } from "react";

export default function DetailsPage() {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { data, dataLoaded } = useFetch(`https://dummyjson.com/products/${id}`);
  const { loading } = usePageSetup(data, dataLoaded);
  const location = useLocation();
  const [navigateBackTo, setNavigateBackTo] = useState(null);

  function handleNavigateBack() {
    navigate(location.state?.from, { state: { from: location } });
  }

  function getProductDetailContent() {
    if (data) {
      return <ProductDetails product={data} />;
    } else {
      return <p>No details found</p>;
    }
  }

  useEffect(() => {
    switch (location.state?.from.pathname) {
      case "/account":
        setNavigateBackTo("favorites");
        break;
      case "/cart":
        setNavigateBackTo("cart");
        break;
      default:
        setNavigateBackTo("products");
        break;
    }
  }, []);

  return (
    <div className="page-container details-page">
      <div className="back-btn-container">
        <Button
          handleAction={handleNavigateBack}
          type="back"
          icon={<FaArrowLeftLong />}
        />
        <span>{navigateBackTo}</span>
      </div>

      {loading ? (
        <p className="loading-message">Loading... </p>
      ) : (
        getProductDetailContent()
      )}
    </div>
  );
}
