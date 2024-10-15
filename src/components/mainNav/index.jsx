import { useNavigate } from "react-router-dom";
import styles from "./mainNav.module.scss";
import Button from "../button/index.jsx";
import { mainNavItems } from "../../config/pages.js";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext.jsx";

export default function MainNav() {
  const navigate = useNavigate();
  const { uiDispatch } = useContext(UIContext);

  function handleNavigate(item) {
    if (item.name === "account") {
      uiDispatch({
        type: "UPDATE_ACCOUNT_VIEW_TYPE",
        payload: "overview",
      });
      sessionStorage.setItem("currentAccountViewType", "overview");
    } else if (item.name === "favorites") {
      uiDispatch({
        type: "UPDATE_ACCOUNT_VIEW_TYPE",
        payload: "favorites",
      });
      sessionStorage.setItem("currentAccountViewType", "favorites");
    }
    navigate(item.link);
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
        </ul>
      </nav>
    </div>
  );
}
