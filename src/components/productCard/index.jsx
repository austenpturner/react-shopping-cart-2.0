import styles from "./productCard.module.scss";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import ProductImg from "../productImg";

export default function ProductCard({ product, parent }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <li className={`${styles.productCard} ${styles[parent]}`}>
      <ProductImg product={product} parent={parent} />
      <p
        className={styles.title}
        onClick={() =>
          navigate(`/product-details/${product.id}`, {
            state: { from: location },
          })
        }
      >
        {product.title}
      </p>
      {product.price && <p className={styles.price}>{`$${product.price}`}</p>}
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  parent: PropTypes.string,
  handleAddToCart: PropTypes.func,
};
