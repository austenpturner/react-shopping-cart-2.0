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
import { FaCheck, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import useFavoriteActions from "../../hooks/useFavoriteActions.js";

export default function ProductCard({ product }) {
  const { state, uiDispatch } = useContext(UIContext);
  const user = useSelector((state) => state.users.currentUser);
  const buttonText = state.buttonText[product.id] || "Add to cart";
  const { handleAddToCart } = useCartActions();
  const navigate = useNavigate();
  const { width } = useWindowResize();
  const [imageSize, setImageSize] = useState(null);
  const { handleAddToFavorites, handleFetchFavorites } = useFavoriteActions();
  const favorites = useSelector((state) => state.favorites);
  const isFavorited = favorites.includes(product.id);

  console.log(favorites);

  function handleShowQuickShopModal() {
    console.log(product);
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: product,
        type: "quickShop",
      },
    });
  }

  function handleShowLoginModal() {
    // console.log(product);
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: product,
        type: "requestLogin",
      },
    });
  }

  function addToFavoritesRequest(product) {
    if (user) {
      console.log(product);
      handleAddToFavorites(product);
    } else {
      handleShowLoginModal();
    }
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

  useEffect(() => {
    handleFetchFavorites();
    console.log(`favorites fetched`, favorites);
  }, [favorites]);

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
          icon={isFavorited ? <FaCheck /> : <FaHeart />}
          type="favorite"
          item={product}
          handleAction={addToFavoritesRequest}
        />
        <Button
          text="quick shop"
          item={product}
          type="quickShop"
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
