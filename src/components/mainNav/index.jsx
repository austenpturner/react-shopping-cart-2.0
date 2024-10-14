import { useNavigate } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import Button from "../button/index.jsx";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext.jsx";
import { mainNavItems } from "../../config/pages.js";

export default function MainNav() {
  const loading = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.currentUser);
  const { uiDispatch } = useContext(UIContext);

  function handleNavigate(item) {
    if (item.name === "account") {
      sessionStorage.setItem("currentViewType", "overview");
    }
    navigate(item.link);
  }

  function handleShowLogoutConfirmation() {
    uiDispatch({
      type: "SHOW_MODAL",
      payload: {
        content: null,
        type: "logoutConfirmation",
      },
    });
  }

  function handleClickLogInOutBtn() {
    if (user) {
      handleShowLogoutConfirmation();
      uiDispatch({ type: "TOGGLE_MOBILE_NAV", payload: false });
    } else {
      navigate("/login");
    }
  }

  return (
    <div className={styles.mainNavContainer}>
      <nav>
        <ul className={styles.mainNav} id="mainNav">
          {mainNavItems.map((item) => {
            return (
              <li key={item.id}>
                <Button
                  handleAction={() => handleNavigate(item)}
                  icon={<item.icon />}
                  type={"mainNav"}
                />
              </li>
            );
          })}
          <li>
            {loading ? (
              <button></button>
            ) : (
              <Button
                handleAction={handleClickLogInOutBtn}
                text={user ? "Logout" : "Log in"}
                type={user ? "logout" : "login"}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
