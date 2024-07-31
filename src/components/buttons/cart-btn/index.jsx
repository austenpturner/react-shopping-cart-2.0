import PropTypes from "prop-types";
import "../styles.css";
import { useEffect, useState } from "react";

export default function CartBtnComponent({ type, onClick }) {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");

  function handleClick() {
    onClick();
    flashAddedText();
  }

  function flashAddedText() {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }

  useEffect(() => {
    if (type === "add") {
      setText("add to cart");
    } else {
      setText("remove");
    }
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`${type === "add" ? "add" : "remove"} ${"btnElement"}`}
    >
      {clicked ? "added!" : text}
    </button>
  );
}

CartBtnComponent.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
