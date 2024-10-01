import styles from "./cartCard.module.scss";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useCartActions from "../../hooks/useCartActions";
import Button from "../button";
import { useNavigate } from "react-router-dom";

export default function CartCard({ item }) {
  const { title, price, thumbnail, quantity } = item;
  const navigate = useNavigate();
  const { handleRemoveFromCart, handleUpdateQuantity } = useCartActions();

  return (
    <div className={styles.cartCard}>
      <div className={`${styles.col} ${styles.itemDetailsContainer}`}>
        <LazyLoadImage
          src={thumbnail}
          alt={title}
          effect="blur"
          width={80}
          height={80}
          className={styles.image}
          onClick={() => navigate(`/product-details/${item.id}`)}
        />
        <p
          className={styles.title}
          onClick={() => navigate(`/product-details/${item.id}`)}
        >
          {title}
        </p>
      </div>
      <div className={`${styles.col} ${styles.itemQuantityContainer}`}>
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
      <div className={`${styles.col} ${styles.itemPriceContainer}`}>
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
