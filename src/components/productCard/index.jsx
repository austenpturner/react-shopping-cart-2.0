import styles from "./productCard.module.scss";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../button";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import useCartActions from "../../hooks/useCartActions";
import { useNavigate } from "react-router-dom";
import useWindowResize from "../../hooks/useWindowResize.js";
import { useState } from "react";
import { useEffect } from "react";

export default function ProductCard({ product }) {
  const { state, uiDispatch } = useContext(UIContext);
  const buttonText = state.buttonText[product.id] || "Add to cart";
  const { handleAddToCart } = useCartActions();
  const navigate = useNavigate();
  const { width } = useWindowResize();
  const [imageSize, setImageSize] = useState(null);

  function handleShowQuickShopModal() {
    console.log(`show modal for ${product.title}`);
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: product,
        type: "quickShop",
      },
    });
  }

  function getImageSize() {
    if (width >= 1024) {
      setImageSize(176.8);
    } else if (width >= 768) {
      setImageSize((width - 120) / 4);
    } else {
      setImageSize((width - 80) / 2);
    }
  }

  useEffect(() => {
    getImageSize();
  }, [width]);

  return (
    <li className={styles.productCard}>
      <div className={styles.imgContainer}>
        <LazyLoadImage
          src={product.thumbnail}
          alt={product.title}
          className={styles.productCardImg}
          width={imageSize}
          height={imageSize}
          effect="blur"
          onClick={() => navigate(`/product-details/${product.id}`)}
        />
        <Button
          text={"quick shop"}
          item={product}
          className={styles.quickShopBtn}
          type={"quickShop"}
          handleAction={handleShowQuickShopModal}
        />
      </div>
      <p className={styles.title}>{product.title}</p>
      <p className={styles.price}>{`$${product.price}`}</p>
      <Button
        handleAction={handleAddToCart}
        item={product}
        text={buttonText}
        type={"addToCart"}
      />
    </li>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
  handleAddToCart: PropTypes.func,
};
