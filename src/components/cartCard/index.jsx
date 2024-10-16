import styles from "./cartCard.module.scss";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useCartActions from "../../hooks/useCartActions";
import Button from "../button";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function CartCard({ item }) {
  const { title, price, thumbnail, quantity } = item;
  const navigate = useNavigate();
  const { handleRemoveFromCart, handleUpdateQuantity } = useCartActions();
  const location = useLocation();
  const { state } = useContext(UIContext);

  function handleNavigate(event) {
    if (event.key === "Enter") {
      navigate(`/product-details/${item.id}`, {
        state: { from: location },
      });
    }
  }

  return (
    <div className={styles.cartCard}>
      <div className={`${styles.col} ${styles.itemDetailsContainer}`}>
        <LazyLoadImage
          src={thumbnail}
          alt={title}
          effect="blur"
          width={100}
          height={100}
          className={styles.image}
          tabIndex={state.overlayVisible ? "-1" : "0"}
          onClick={() =>
            navigate(`/product-details/${item.id}`, {
              state: { from: location },
            })
          }
          onKeyDown={handleNavigate}
        />
        <div>
          <p
            className={styles.title}
            onClick={() =>
              navigate(`/product-details/${item.id}`, {
                state: { from: location },
              })
            }
          >
            {title}
          </p>
          <p>${price}</p>
        </div>
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
