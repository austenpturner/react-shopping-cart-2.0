import "../styles.css";
import PropTypes from "prop-types";

export default function ReviewsButton({ handleShowReviews, showReviews }) {
  return (
    <button onClick={handleShowReviews} className="btnElement reviews">
      {showReviews ? "hide reviews" : "show reviews"}
    </button>
  );
}

ReviewsButton.propTypes = {
  handleShowReviews: PropTypes.func,
  showReviews: PropTypes.bool,
};
