import { useLocation, useNavigate } from "react-router-dom";
import MainNav from "../mainNav";
import styles from "./header.module.scss";
import CategoryMenu from "../categoryMenu/categoryMenu";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function MainHeader() {
  const navigate = useNavigate();
  const { uiDispatch } = useContext(UIContext);
  const location = useLocation();

  function handleNavigate() {
    if (location.pathname !== "/") {
      uiDispatch({
        type: "UPDATE_CATEGORY",
        payload: null,
      });
    }

    navigate("/");
  }

  return (
    <header className={styles.mainHeader}>
      <CategoryMenu />
      <h4
        tabIndex="0"
        onKeyDown={(e) => {
          e.key === "Enter" && handleNavigate();
        }}
        onClick={() => handleNavigate()}
      >
        React Cart App
      </h4>
      <MainNav />
    </header>
  );
}
