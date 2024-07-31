import styles from "./cart-card.module.css";
import CartBtnComponent from "../buttons/cart-btn";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import DetailsBtnComponent from "../buttons/details-btn";

export default function CartCard({
  product,
  handleQuantityChange,
  handleDelete,
}) {
  return (
    <div key={product.details.id} className={styles.cartCard}>
      <LazyLoadImage
        src={product.details.thumbnail}
        alt={product.details.title}
        effect="blur"
        width={100}
        height={100}
      />
      <div className={styles.titleContainer}>
        <p>{product.details.title}</p>
        <DetailsBtnComponent productId={product.details.id} />
      </div>
      <div className={styles.quantityContainer}>
        <p>quantity: </p>
        <div>
          <button onClick={() => handleQuantityChange(product, "decrease")}>
            -
          </button>
          <p>{product.quantity}</p>
          <button onClick={() => handleQuantityChange(product, "increase")}>
            +
          </button>
        </div>
      </div>
      <div className={styles.priceContainer}>
        <p>{`$${product.details.price * product.quantity}`}</p>
        <CartBtnComponent
          type={"remove"}
          onClick={() => handleDelete(product)}
        />
      </div>
    </div>
  );
}

CartCard.propTypes = {
  product: PropTypes.object,
  handleQuantityChange: PropTypes.func,
  handleDelete: PropTypes.func,
};
