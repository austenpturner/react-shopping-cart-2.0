import { useNavigate } from "react-router-dom";
import styles from "./mainNav.module.scss";
import Button from "../button/index.jsx";
import { mainNavItems } from "../../config/pages.js";

export default function MainNav() {
  const navigate = useNavigate();

  function handleNavigate(item) {
    if (item.name === "account") {
      sessionStorage.setItem("currentViewType", "overview");
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
