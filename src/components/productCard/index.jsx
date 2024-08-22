import styles from "./productCard.module.css";
import PropTypes from "prop-types";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../button";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import useCartActions from "../../hooks/useCartActions";

export default function ProductCard({ product }) {
  const { state } = useContext(UIContext);
  const buttonText = state.buttonText[product.id] || "Add to cart";
  const { handleAddToCart } = useCartActions();

  return (
    <li className={styles.productCard}>
      <p className={styles.name}>{product.name}</p>
      <p className={styles.price}>{`$${product.price}`}</p>
      <Button
        handleAction={handleAddToCart}
        item={product}
        text={buttonText}
        type={"addToCart"}
      />
    </li>
    // <div className={styles.productCard}>
    //   <LazyLoadImage
    //     src={product.thumbnail}
    //     alt={product.title}
    //     className={styles.productCardImg}
    //     width={200}
    //     height={200}
    //     effect="blur"
    //     onClick={() => navigate(`/product-details/${product.id}`)}
    //   />
    //   <p className={styles.title}>{product.title}</p>
    //   <div>
    //     <p className={styles.price}>{`$${product.price}`}</p>
    //     <CartBtnComponent type={"add"} onClick={handleAddToCart} />
    //   </div>
    // </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  handleAddToCart: PropTypes.func,
};
