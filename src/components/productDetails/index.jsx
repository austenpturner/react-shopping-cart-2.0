import CartBtnComponent from "../buttons/cart-btn";
import PropTypes from "prop-types";
import styles from "./productDetails.module.scss";
import ReviewsButton from "../buttons/reviews-btn";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaStar } from "react-icons/fa";

export default function ProductDetails({ data, handleAddToCart }) {
  const [showReviews, setShowReview] = useState(false);

  return (
    <div className={styles.productContainer}>
      <div className={styles.detailsContainer}>
        <div className={styles.imageContainer}>
          <LazyLoadImage
            src={data?.thumbnail}
            alt={data.title}
            effect="blur"
            className={styles.detailsImage}
            width={300}
            height={300}
          />
        </div>
        <div className={styles.details}>
          <h1>{data?.title}</h1>
          <p className={styles.description}>{data?.description}</p>
          <div className={styles.purchaseContainer}>
            <p className={styles.price}>{`$${data?.price}`}</p>
            <CartBtnComponent type={"add"} onClick={handleAddToCart} />
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.ratingsAndReviewsContainer}>
        <h2>Reviews & Ratings</h2>
        <div className={styles.ratingContainer}>
          <div className={styles.column}>
            <p>{`${data.reviews.length} reviews`}</p>
            <ReviewsButton
              handleShowReviews={() => setShowReview(!showReviews)}
              showReviews={showReviews}
            />
          </div>
          <div className={styles.column}>
            <p>{`${data?.rating} out of 5`}</p>
            <div>
              {[...Array(Math.round(data?.rating))].map((_, index) => {
                index += 1;
                return <FaStar key={index} />;
              })}
            </div>
          </div>
        </div>
        <div className={styles.reviewsContainer}>
          {showReviews ? (
            <ul className={styles.reviewsList}>
              {data?.reviews?.length > 0 ? (
                data.reviews.map((review, index) => {
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
  data: PropTypes.object,
  handleAddToCart: PropTypes.func,
};
