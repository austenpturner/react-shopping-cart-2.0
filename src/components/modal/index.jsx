import PropTypes from "prop-types";
import Button from "../button";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import styles from "./modal.module.scss";
import QuickShop from "../quickShop";
import LoginRequest from "../loginRequest";
import LogoutConfirmation from "../logoutConfirmation";
import { IoCloseOutline } from "react-icons/io5";

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
        return <LoginRequest />;
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
      <Button
        handleAction={handleCloseModal}
        icon={<IoCloseOutline />}
        type="closeModal"
      />
      {renderModalContent()}
    </div>
  );
}

Modal.propTypes = {
  type: PropTypes.string,
  content: PropTypes.node,
};
