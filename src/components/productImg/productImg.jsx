import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../button";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import styles from "./productImg.module.scss";
import { useContext } from "react";
import { useSelector } from "react-redux";
import useWindowResize from "../../hooks/useWindowResize";
import { useState } from "react";
import useFavoriteActions from "../../hooks/useFavoriteActions";
import { useEffect } from "react";
import { UIContext } from "../../context/uiContext";
import PropTypes from "prop-types";

export default function ProductImg({ product, page }) {
  const navigate = useNavigate();
  const { uiDispatch } = useContext(UIContext);
  const user = useSelector((state) => state.users.currentUser);
  const { width } = useWindowResize();
  const [imageSize, setImageSize] = useState(null);
  const { handleAddToFavorites, handleRemoveFromFavorites } =
    useFavoriteActions();
  const favorites = useSelector((state) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteBtnVisible, setFavoriteBtnVisible] = useState(null);
  const [navigateOnClick, setNavigateOnClick] = useState(null);
  const [showQuickShopBtn, setShowQuickShopBtn] = useState(null);

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
    console.log(product);

    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: product,
        type: "requestLogin",
      },
    });
  }

  function handleNavigateOnClick() {
    if (navigateOnClick) {
      navigate(`/product-details/${product.id}`);
    }
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
    const breakpoints = {
      products: {
        1024: 176.8,
        768: (width - 120) / 4,
        default: (width - 80) / 2,
      },
      details: {
        768: 300,
        450: 400,
        default: width * 0.9,
      },
      quickShop: {
        450: 300,
        default: width * 0.7,
      },
    };

    const getPageSize = (page, width) => {
      const pageBreakpoints = breakpoints[page] || {};
      const sortedWidths = Object.keys(pageBreakpoints)
        .map(Number)
        .sort((a, b) => b - a);

      for (const bp of sortedWidths) {
        if (width >= bp) return pageBreakpoints[bp];
      }
      return pageBreakpoints.default || 300; // Default size
    };

    setImageSize(getPageSize(page, width));
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

  useEffect(() => {
    if (page === "favorites" || page === "products") {
      setFavoriteBtnVisible(false);
      setNavigateOnClick(true);
      setShowQuickShopBtn(true);
    } else {
      setFavoriteBtnVisible(true);
      setNavigateOnClick(false);
      setShowQuickShopBtn(false);
    }
  }, [page]);

  return (
    <div
      className={styles.imgContainer}
      data-visible={favoriteBtnVisible ? true : false}
    >
      <LazyLoadImage
        src={product.thumbnail}
        alt={product.title}
        className={navigateOnClick ? styles.hoverCursor : ""}
        width={imageSize}
        height={imageSize}
        effect="blur"
        onClick={handleNavigateOnClick}
      />
      <Button
        icon={
          isFavorite ? (
            <FaHeart className="red" />
          ) : (
            <FaHeart className="grey" />
          )
        }
        type="favorite"
        item={product}
        handleAction={addToFavoritesRequest}
      />
      {showQuickShopBtn && (
        <Button
          text="quick shop"
          item={product}
          type="quickShop"
          handleAction={handleShowQuickShopModal}
        />
      )}
    </div>
  );
}

ProductImg.propTypes = {
  product: PropTypes.object,
  page: PropTypes.string,
};
