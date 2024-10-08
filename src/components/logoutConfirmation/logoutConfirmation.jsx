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
    </div>
  );
}
