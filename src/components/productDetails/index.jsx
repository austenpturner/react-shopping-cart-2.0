import Button from "../button";
import PropTypes from "prop-types";
import styles from "./productDetails.module.scss";
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import { UIContext } from "../../context/uiContext";
import useCartActions from "../../hooks/useCartActions";
import ProductImg from "../productImg/productImg";

export default function ProductDetails({ product }) {
  const [showReviews, setShowReviews] = useState(false);
  const { state } = useContext(UIContext);
  const buttonText = state.buttonText[product.id] || "Add to cart";
  const { handleAddToCart } = useCartActions();

  function handleShowReviews() {
    setShowReviews(!showReviews);
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.detailsContainer}>
        <ProductImg product={product} page="details" />
        <div className={styles.details}>
          <div>
            <h1>{product?.title}</h1>
            <p className={styles.description}>{product?.description}</p>
          </div>

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
      <hr />
      <div className={styles.ratingsAndReviewsContainer}>
        <h2>Reviews & Ratings</h2>
        <div className={styles.ratingContainer}>
          <div className={styles.column}>
            <p>{`${product.reviews.length} reviews`}</p>
            <Button
              handleAction={handleShowReviews}
              type="switch"
              text="show reviews"
            />
          </div>
          <div className={styles.column}>
            <p>{`${product?.rating} out of 5`}</p>
            <div>
              {[...Array(Math.round(product?.rating))].map((_, index) => {
                index += 1;
                return <FaStar key={index} />;
              })}
            </div>
          </div>
        </div>
        <div className={styles.reviewsContainer}>
          {showReviews ? (
            <ul className={styles.reviewsList}>
              {product?.reviews?.length > 0 ? (
                product.reviews.map((review, index) => {
                  return (
                    <li key={index}>
                      <p
                        className={styles.reviewRating}
                      >{`Rating: ${review.rating}`}</p>
                      <p
                        className={styles.reviewComment}
                      >{`"${review.comment}"`}</p>
                      <p
                        className={styles.reviewName}
                      >{`- ${review.reviewerName}`}</p>
                    </li>
                  );
                })
              ) : (
                <p>No reviews.</p>
              )}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object,
};
