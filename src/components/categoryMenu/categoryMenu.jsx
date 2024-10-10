import { useContext } from "react";
import { categories } from "../../config/categories";
import Button from "../button";
import { UIContext } from "../../context/uiContext";
// import HamburgerBtn from "../hamburgerBtn/hamburgerBtn";

export default function CategoryMenu() {
  const { state, uiDispatch } = useContext(UIContext);

  return (
    <>
      {/* <HamburgerBtn /> */}
      <ul className="category-list">
        {categories.map((category) => {
          return (
            <li
              key={category.id}
              onClick={() =>
                uiDispatch({
                  type: "UPDATE_CATEGORY",
                  payload: category.filter,
                })
              }
            >
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
