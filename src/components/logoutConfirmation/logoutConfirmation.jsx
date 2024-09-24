import { useContext } from "react";
import useLogout from "../../hooks/useLogout";
import Button from "../button";
import { UIContext } from "../../context/uiContext";
import { useState } from "react";
import styles from "./logoutConfirmation.module.scss";

export default function LogoutConfirmation() {
  const handleLogout = useLogout();
  const { uiDispatch } = useContext(UIContext);
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);

  function handleLogoutConfirmation() {
    handleLogout();
    setLogoutConfirmed(true);
  }

  function handleCloseLogoutModal() {
    uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
    uiDispatch({ type: "HIDE_MODAL" });
  }

  return (
    <div className={styles.logoutConfirmationModal}>
      {logoutConfirmed ? (
        <div>
          <h2>You have been logged out.</h2>
        </div>
      ) : (
        <div>
          <h2>Are you sure you want to log out?</h2>
          <Button
            text="yes"
            type="confirmation"
            handleAction={handleLogoutConfirmation}
          />
        </div>
      )}

      <Button
        text="go back"
        type="confirmation"
        handleAction={handleCloseLogoutModal}
      />
    </div>
  );
}
