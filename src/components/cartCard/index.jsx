import styles from "./cartCard.module.css";
import PropTypes from "prop-types";
// import { LazyLoadImage } from "react-lazy-load-image-component";
import useCartActions from "../../hooks/useCartActions";
import Button from "../button";

export default function CartCard({ item }) {
  const { name, price, quantity } = item;
  const { handleRemoveFromCart, handleUpdateQuantity } = useCartActions();

  // <LazyLoadImage
  //   src={product.details.thumbnail}
  //   alt={product.details.title}
  //   effect="blur"
  //   width={100}
  //   height={100}
  // />;
  //! add image back

  return (
    <div className={styles.cartCard}>
      <div className={styles.itemNameContainer}>
        <p className={styles.name}>{name}</p>
      </div>
      <div className={styles.itemQuantityContainer}>
        <p className={styles.quantity}>{quantity}</p>
        <div className={styles.quantityBtnContainer}>
          <Button
            handleAction={handleUpdateQuantity}
            text={"-"}
            type={"decreaseQuantity"}
            action={"decrease"}
            item={item}
          />
          <Button
            handleAction={handleUpdateQuantity}
            text={"+"}
            type={"increaseQuantity"}
            action={"increase"}
            item={item}
          />
        </div>
      </div>
      <div className={styles.itemPriceContainer}>
        <p className={styles.price}>{`$${price * quantity}`}</p>
        <Button
          handleAction={handleRemoveFromCart}
          text={"remove"}
          type={"removeFromCart"}
          item={item}
        />
      </div>
    </div>
  );
}

CartCard.propTypes = {
  item: PropTypes.object,
};
