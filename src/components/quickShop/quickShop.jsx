import PropTypes from "prop-types";
import styles from "./quickShop.module.scss";
import Button from "../button";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import useCartActions from "../../hooks/useCartActions";
import { FaStar } from "react-icons/fa";
import ProductImg from "../productImg/productImg";
import { FaArrowRightLong } from "react-icons/fa6";

export default function QuickShop({ product }) {
  const navigate = useNavigate();
  const { state, uiDispatch } = useContext(UIContext);
  const buttonText = state.buttonText[product.id] || "Add to cart";
  const { handleAddToCart } = useCartActions();
  const location = useLocation();

  function handleNavigateToDetails() {
    navigate(`/product-details/${product.id}`, {
      state: { from: location },
    });
    uiDispatch({ type: "HIDE_MODAL" });
  }

  return (
    <div className={styles.quickShopContainer}>
      <ProductImg product={product} parent="quickShop" />
      <div className={styles.detailsContainer}>
        <h4>{product.title}</h4>
        <p className={styles.rating}>
          <span>
            {[...Array(Math.round(product?.rating))].map((_, index) => {
              index += 1;
              return <FaStar key={index} />;
            })}
          </span>
          <span>{product.rating} out of 5</span>
        </p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.priceContainer}>
          <p className={styles.price}>${product.price}</p>
          <Button
            text={buttonText}
            type="addToCart"
            item={product}
            handleAction={handleAddToCart}
          />
        </div>
        <Button
          text="view full details"
          icon={<FaArrowRightLong />}
          type="navigate"
          handleAction={handleNavigateToDetails}
        />
      </div>
    </div>
  );
}

QuickShop.propTypes = {
  product: PropTypes.object,
};
