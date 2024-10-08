import useLogout from "../../hooks/useLogout";
import Button from "../button";
import { useState } from "react";
import styles from "./logoutConfirmation.module.scss";

export default function LogoutConfirmation() {
  const handleLogout = useLogout();
  const [logoutConfirmed, setLogoutConfirmed] = useState(false);

  function handleLogoutConfirmation() {
    handleLogout();
    setLogoutConfirmed(true);
  }

  return (
    <div className={styles.logoutConfirmationModal}>
      {logoutConfirmed ? (
        <div>
          <h3>You have been logged out.</h3>
        </div>
      ) : (
        <div>
          <h3>Are you sure you want to log out?</h3>
          <Button
            text="yes"
            type="confirmation"
            handleAction={handleLogoutConfirmation}
          />
        </div>
      )}
    </div>
  );
}
