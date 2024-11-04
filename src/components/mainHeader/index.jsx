import { useLocation, useNavigate } from "react-router-dom";
import MainNav from "../mainNav";
import styles from "./header.module.scss";
import CategoryMenu from "../categoryMenu";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import SearchBar from "../searchBar";
import useWindowResize from "../../hooks/useWindowResize";

export default function MainHeader() {
  const navigate = useNavigate();
  const { uiDispatch } = useContext(UIContext);
  const location = useLocation();
  const { state } = useContext(UIContext);
  const { width } = useWindowResize();

  function handleNavigate() {
    if (location.pathname !== "/") {
      uiDispatch({
        type: "UPDATE_CATEGORY",
        payload: null,
      });
    }
    navigate("/");
  }

  console.log(state.accountViewListOpen);

  return (
    <header className={styles.mainHeader}>
      <div className={styles.topRow}>
        <h4
          tabIndex={
            state.modal.isVisible ||
            state.overlayVisible ||
            (state.accountViewListOpen && width <= 768)
              ? "-1"
              : "0"
          }
          onKeyDown={(e) => {
            e.key === "Enter" && handleNavigate();
          }}
          onClick={() => handleNavigate()}
        >
          React Cart App
        </h4>
        <MainNav />
      </div>
      <div className={styles.bottomRow}>
        <CategoryMenu />
        <SearchBar />
      </div>
    </header>
  );
}
