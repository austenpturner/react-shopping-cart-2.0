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
  const { handleAddToFavorites, handleRemoveFromFavorites } =
    useFavoriteActions();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  function handleShowQuickShopModal() {
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: product,
        type: "quickShop",
      },
    });
  }

  function handleShowLoginModal() {
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: product,
        type: "requestLogin",
      },
    });
  }

  function addToFavoritesRequest(product) {
    if (user && !isFavorite) {
      handleAddToFavorites(product);
    } else if (user && isFavorite) {
      handleRemoveFromFavorites(product);
    } else {
      const { title, thumbnail, id } = product;
      const item = { title, thumbnail, id };
      localStorage.setItem(`pendingFavorite`, JSON.stringify(item));
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
    const match = favorites.find((favorite) => favorite.id === product.id);

    if (match) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
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
          icon={isFavorite ? <FaCheck className="check" /> : <FaHeart />}
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
      {product.price ? (
        <p className={styles.price}>{`$${product.price}`}</p>
      ) : (
        ""
      )}

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
