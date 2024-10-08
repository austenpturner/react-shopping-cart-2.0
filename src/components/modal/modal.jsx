import PropTypes from "prop-types";
import Button from "../button";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import styles from "./modal.module.scss";
import QuickShop from "../quickShop/quickShop";
import RequestLogin from "../requestLogin/requestLogin";
import LogoutConfirmation from "../logoutConfirmation/logoutConfirmation";

export default function Modal() {
  const { state, uiDispatch } = useContext(UIContext);
  const { isVisible, type, content } = state.modal;

  function handleCloseModal() {
    uiDispatch({ type: "HIDE_MODAL" });
  }

  function renderModalContent() {
    switch (type) {
      case "quickShop":
        return <QuickShop product={content} />;
      case "requestLogin":
        return <RequestLogin />;
      case "logoutConfirmation":
        return <LogoutConfirmation />;
      default:
        return null;
    }
  }

  return (
    <div
      className={`${styles.modal} ${styles[type]}`}
      data-visible={isVisible ? true : false}
    >
      <Button handleAction={handleCloseModal} text="X" type="closeModal" />
      {renderModalContent()}
    </div>
  );
}

Modal.propTypes = {
  type: PropTypes.string,
  content: PropTypes.node,
};
