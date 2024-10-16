import { useNavigate } from "react-router-dom";
import Button from "../button";
import styles from "./loginRequest.module.scss";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function LoginRequest() {
  const navigate = useNavigate();
  const { uiDispatch } = useContext(UIContext);

  function handleLoginRedirect() {
    uiDispatch({ type: "HIDE_MODAL" });
    navigate("/login");
  }

  return (
    <div className={styles.loginRequestModal}>
      <div>
        <h3>Please log in to add to favorites</h3>
        <Button text="Log In" type="login" handleAction={handleLoginRedirect} />
      </div>
    </div>
  );
}
