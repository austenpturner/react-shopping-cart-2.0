import PropTypes from "prop-types";
import Button from "../button";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import styles from "./modal.module.scss";
import QuickShop from "../quickShop/quickShop";

export default function Modal() {
  const { state, uiDispatch } = useContext(UIContext);
  const { isVisible, type, content } = state.modal;

  function handleCloseModal() {
    uiDispatch({ type: "HIDE_MODAL" });
  }

  return (
    <div className={styles.modal} data-visible={isVisible ? true : false}>
      <Button handleAction={handleCloseModal} text="X" type="closeModal" />
      <div className={styles.modalContent}>
        {type === "quickShop" ? <QuickShop product={content} /> : null}
      </div>
    </div>
  );
}

Modal.propTypes = {
  type: PropTypes.string,
  content: PropTypes.node,
};
