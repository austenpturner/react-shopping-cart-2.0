import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function DetailsBtnComponent({ productId }) {
  const navigate = useNavigate();
  return (
    <button
      className="btnElement details"
      onClick={() => navigate(`/product-details/${productId}`)}
    >
      details
    </button>
  );
}

DetailsBtnComponent.propTypes = {
  productId: PropTypes.number,
};
