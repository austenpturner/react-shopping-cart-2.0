import ProductCard from "../../components/productCard";
import "./styles.scss";
import useFetch from "../../hooks/useFetch";
import usePageSetup from "../../hooks/usePageSetup";
import { PulseLoader } from "react-spinners";
import { useContext } from "react";
import CategoryMenu from "../../components/categoryMenu/categoryMenu";
import { UIContext } from "../../context/uiContext";
import SearchBar from "../../components/searchBar/searchBar";

export default function HomePage() {
  const { data, dataLoaded } = useFetch(`https://dummyjson.com/products/`);
  const { loading } = usePageSetup(data?.products?.length > 0, dataLoaded);
  const { state } = useContext(UIContext);

  function renderProducts() {
    if (loading || state.search.searchInProgress) {
      return <PulseLoader color="#a0a0a0" margin={1} size={12} />;
    } else if (
      state.search.searchSubmitted &&
      state.search.searchResults?.length > 0
    ) {
      return (
        <ul className="product-list">
          {state.search.searchResults.map((match) => (
            <ProductCard key={match.id} product={match} parent="products" />
          ))}
        </ul>
      );
    } else if (
      state.search.searchSubmitted &&
      state.search.searchResults?.length === 0
    ) {
      return <p>No results found.</p>;
    } else {
      return productList;
    }
  }

  const productList = (
    <ul className="product-list">
      {data?.products?.length > 0 ? (
        data.products.map((product) => {
          if (!state.selectedCategory) {
            return (
              <ProductCard
                key={product.id}
                product={product}
                parent="products"
              />
            );
          } else if (
            state.selectedCategory &&
            product.category === state.selectedCategory
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
        <CategoryMenu />
        <SearchBar content={data?.products} />
      </div>
      {renderProducts()}
    </div>
  );
}
