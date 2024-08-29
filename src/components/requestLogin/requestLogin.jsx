import { useNavigate } from "react-router-dom";
import Button from "../button";
import styles from "./requestLogin.module.scss";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function RequestLogin() {
  const navigate = useNavigate();
  const { uiDispatch } = useContext(UIContext);

  function handleLoginRedirect() {
    uiDispatch({ type: "HIDE_MODAL" });
    navigate("/login");
  }

  function handleCloseModal() {
    uiDispatch({ type: "HIDE_MODAL" });
  }

  return (
    <div className={styles.requestLoginModal}>
      <div>
        <h2>Please log in to add to favorites</h2>
        <Button
          text="Log In"
          type="navigate"
          handleAction={handleLoginRedirect}
        />
      </div>
      <Button
        text="go back"
        type="confirmation"
        handleAction={handleCloseModal}
      />
    </div>
  );
}
