import styles from "./productCard.module.scss";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ProductImg from "../productImg/productImg.jsx";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <li className={styles.productCard}>
      <ProductImg product={product} parent="products" />
      <p
        className={styles.title}
        onClick={() => navigate(`/product-details/${product.id}`)}
      >
        {product.title}
      </p>
      {product.price && <p className={styles.price}>{`$${product.price}`}</p>}
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  handleAddToCart: PropTypes.func,
};
