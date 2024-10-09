import ProductCard from "../../components/productCard";
import "./styles.scss";
import useFetch from "../../hooks/useFetch";
import usePageSetup from "../../hooks/usePageSetup";
import { PulseLoader } from "react-spinners";
import { useState } from "react";
import Button from "../../components/button";
import CommonForm from "../../components/commonForm";
import { searchFormControls } from "../../config/productSearch";
import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

export default function HomePage() {
  const { data, dataLoaded } = useFetch(`https://dummyjson.com/products/`);
  const { loading } = usePageSetup(data?.products?.length > 0, dataLoaded);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchInput, setSearchInput] = useState({});
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchMatches, setSearchMatches] = useState([]);

  function handleSearch(e) {
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setSearchInProgress(true);
    setSubmittedSearch(searchInput.searchTerm);

    const matches = data.products.filter((product) => {
      const lowerCaseTitle = product.title.toLowerCase();
      const lowerCaseSearch = searchInput.searchTerm.toLowerCase();
      return lowerCaseTitle.includes(lowerCaseSearch);
    });

    setSearchMatches(matches);
    setSearchInProgress(false);
  }

  function handleClearSearch() {
    setSearchInput({});
    setSubmittedSearch("");
    setSelectedCategory(null);
  }

  function renderProducts() {
    if (loading || searchInProgress) {
      return <PulseLoader color="#a0a0a0" margin={1} size={12} />;
    } else if (submittedSearch && searchMatches.length > 0) {
      return (
        <ul className="product-list">
          {searchMatches.map((match) => (
            <ProductCard key={match.id} product={match} parent="products" />
          ))}
        </ul>
      );
    } else if (submittedSearch && searchMatches.length === 0) {
      return <p>No results found.</p>;
    } else {
      return productList;
    }
  }

  const categories = [
    {
      id: 1,
      name: "all",
      filter: null,
    },
    {
      id: 2,
      name: "beauty",
      filter: "beauty",
    },
    {
      id: 3,
      name: "fragrances",
      filter: "fragrances",
    },
    {
      id: 4,
      name: "furniture",
      filter: "furniture",
    },
    {
      id: 5,
      name: "groceries",
      filter: "groceries",
    },
  ];

  const productList = (
    <ul className="product-list">
      {data?.products?.length > 0 ? (
        data.products.map((product) => {
          if (!selectedCategory) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                parent="products"
              />
            );
          } else if (
            selectedCategory &&
            product.category === selectedCategory
          ) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                parent="products"
              />
            );
          }
        })
      ) : (
        <p>no products found.</p>
      )}
    </ul>
  );

  return (
    <div className="page-container home-page">
      <h1 className="page-header home-page-header">Products</h1>
      <div className="top-menu">
        <ul className="category-list">
          {categories.map((category) => {
            return (
              <li
                key={category.id}
                onClick={() => setSelectedCategory(category.filter)}
              >
                <Button
                  text={category.name}
                  type={
                    category.name === selectedCategory
                      ? "filter selected-filter"
                      : "filter"
                  }
                />
              </li>
            );
          })}
        </ul>
        <CommonForm
          formControls={searchFormControls}
          formData={searchInput}
          setFormData={handleSearch}
          onSubmit={handleSearchSubmit}
          btnText={<FiSearch />}
        />
      </div>
      {submittedSearch && (
        <Button
          text="clear search"
          icon={<IoCloseOutline />}
          type="clear"
          handleAction={handleClearSearch}
        />
      )}
      {renderProducts()}
    </div>
  );
}
