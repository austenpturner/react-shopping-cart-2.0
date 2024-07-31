import styles from "./product-card.module.css";
import PropTypes from "prop-types";
import CartBtnComponent from "../buttons/cart-btn";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseCartQuantity,
  updateCartTotal,
} from "../../store/slices/cart-slice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  function handleAddToCart() {
    const index = cartItems.findIndex(
      (cartItem) => cartItem.details.id === product.id
    );
    if (index !== -1) {
      dispatch(increaseCartQuantity(index));
      dispatch(updateCartTotal(product.price));
    } else {
      const item = {
        details: product,
        quantity: 1,
      };
      dispatch(addToCart(item));
      dispatch(updateCartTotal(product.price));
    }
  }

  return (
    <div className={styles.productCard}>
      <LazyLoadImage
        src={product.thumbnail}
        alt={product.title}
        className={styles.productCardImg}
        width={200}
        height={200}
        effect="blur"
        onClick={() => navigate(`/product-details/${product.id}`)}
      />
      <p className={styles.title}>{product.title}</p>
      <div>
        <p className={styles.price}>{`$${product.price}`}</p>
        <CartBtnComponent type={"add"} onClick={handleAddToCart} />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
};
