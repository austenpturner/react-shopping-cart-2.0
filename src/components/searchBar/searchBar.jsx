import { FiSearch } from "react-icons/fi";
import { searchFormControls } from "../../config/productSearch";
import CommonForm from "../commonForm";
import { useContext, useState } from "react";
import { UIContext } from "../../context/uiContext";
import PropTypes from "prop-types";
import Button from "../button";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./searchBar.module.scss";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchSearchMatches from "../../hooks/useFetchSearchMatches";

export default function SearchBar() {
  const { data } = useFetch(`https://dummyjson.com/products/`);
  const { state, uiDispatch } = useContext(UIContext);
  const [searchInput, setSearchInput] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const getSearchMatches = useFetchSearchMatches();

  function handleSearch(e) {
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();
    if (location.pathname !== "/products") {
      navigate("/products");
    }
    uiDispatch({
      type: "SEARCH_SUBMITTED",
      payload: {
        searchSubmitted: searchInput.searchTerm,
        searchInProgress: true,
        searchResults: state.search.searchResults,
      },
    });

    const matches = getSearchMatches(searchInput.searchTerm, data);

    uiDispatch({
      type: "SEARCH_SUBMITTED",
      payload: {
        searchSubmitted: searchInput.searchTerm,
        searchInProgress: false,
        searchResults: matches,
      },
    });
  }

  function handleClearSearch() {
    uiDispatch({
      type: "SEARCH_SUBMITTED",
      payload: {
        searchSubmitted: "",
        searchInProgress: false,
        searchResults: [],
      },
    });
    setSearchInput({});
    uiDispatch({ type: "UPDATE_CATEGORY", payload: null });
  }

  return (
    <div className={styles.searchbar}>
      <CommonForm
        formControls={searchFormControls}
        formData={searchInput}
        setFormData={handleSearch}
        onSubmit={handleSearchSubmit}
        btnText={<FiSearch />}
      />
      {state.search.searchSubmitted && (
        <Button
          text="clear search"
          icon={<IoCloseOutline />}
          type="clear"
          handleAction={handleClearSearch}
        />
      )}
    </div>
  );
}

SearchBar.propTypes = {
  content: PropTypes.array,
};
