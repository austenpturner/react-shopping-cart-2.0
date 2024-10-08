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

  return (
    <div className={styles.requestLoginModal}>
      <div>
        <h2>Please log in to add to favorites</h2>
        <Button text="Log In" type="login" handleAction={handleLoginRedirect} />
      </div>
    </div>
  );
}
