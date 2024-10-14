import { useContext, useEffect } from "react";
import { categories } from "../../config/categories";
import Button from "../button";
import { UIContext } from "../../context/uiContext";
// import styles from "./categoryMenu.module.scss";
import "./styles.scss";
import HamburgerBtn from "../hamburgerBtn/hamburgerBtn";
import useWindowResize from "../../hooks/useWindowResize";
import useToggleMobileMenu from "../../hooks/useToggleMobileMenu";

export default function CategoryMenu() {
  const { state, uiDispatch } = useContext(UIContext);
  const { width } = useWindowResize();
  const handleToggleMobileMenu = useToggleMobileMenu();

  function handleCategoryClick(category) {
    uiDispatch({
      type: "UPDATE_CATEGORY",
      payload: category.filter,
    });
    handleToggleMobileMenu();
  }

  useEffect(() => {
    if (width >= 1024) {
      handleToggleMobileMenu();
      if (!state.modal.isVisible) {
        uiDispatch({ type: "TOGGLE_OVERLAY", payload: false });
      }
    }
  }, [width]);

  return (
    <>
      <HamburgerBtn />
      <ul
        className="categoryMenu"
        data-visible={state.openMobileCategoryMenu ? true : false}
      >
        {categories.map((category) => {
          return (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Button
                text={category.name}
                type={
                  category.name === state.selectedCategory
                    ? "filter selected-filter"
                    : "filter"
                }
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
