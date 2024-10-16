import Button from "../button";
import PropTypes from "prop-types";
import styles from "./productDetails.module.scss";
import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { UIContext } from "../../context/uiContext";
import useCartActions from "../../hooks/useCartActions";
import ProductImg from "../productImg";

export default function ProductDetails({ product }) {
  const { state } = useContext(UIContext);
  const buttonText = state.buttonText[product.id] || "Add to cart";
  const { handleAddToCart } = useCartActions();

  return (
    <div className={styles.productContainer}>
      <div className={styles.detailsContainer}>
        <ProductImg product={product} parent="details" />
        <div className={styles.details}>
          <div>
            <h1>{product?.title}</h1>
            <div className={styles.ratingContainer}>
              <span>
                {[...Array(Math.round(product?.rating))].map((_, index) => {
                  index += 1;
                  return <FaStar key={index} />;
                })}
              </span>
              <span>{`${product?.rating} out of 5`}</span>
            </div>
          </div>
          <p className={styles.description}>{product?.description}</p>
          <div className={styles.purchaseContainer}>
            <p className={styles.price}>{`$${product?.price}`}</p>
            <Button
              type={"addToCart"}
              handleAction={handleAddToCart}
              item={product}
              text={buttonText}
            />
          </div>
        </div>
      </div>
      <div className={styles.reviewsContainer}>
        <h2>Ratings & Reviews</h2>
        <ul className={styles.reviewsList}>
          {product?.reviews?.length > 0 ? (
            product.reviews.map((review, index) => {
              return (
                <li key={index}>
                  <span className={styles.reviewRating}>
                    {[...Array(Math.round(review.rating))].map((_, index) => {
                      index += 1;
                      return <FaStar key={index} />;
                    })}
                  </span>
                  <p>
                    <span
                      className={styles.reviewComment}
                    >{`"${review.comment}"`}</span>
                    <span
                      className={styles.reviewName}
                    >{`- ${review.reviewerName}`}</span>
                  </p>
                </li>
              );
            })
          ) : (
            <p>No reviews.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object,
};
