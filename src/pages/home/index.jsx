import { PulseLoader } from "react-spinners";
import useFetch from "../../hooks/useFetch";
import usePageSetup from "../../hooks/usePageSetup";
import "./styles.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import Button from "../../components/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UIContext } from "../../context/uiContext";

export default function HomePage() {
  const { data, dataLoaded } = useFetch(`https://dummyjson.com/products/`);
  const { loading } = usePageSetup(data?.products?.length > 0, dataLoaded);
  const navigate = useNavigate();
  const { uiDispatch } = useContext(UIContext);

  function handleNavigateCategory(category) {
    uiDispatch({ type: "UPDATE_CATEGORY", payload: category });
    navigate("/products");
  }

  const homePageContent = (
    <div>
      <div className="hero">
        <img src={data?.products[0].thumbnail} alt={data?.products[0].title} />
        <div>
          <h2>New Beauty Products</h2>
          <Button
            text="see all"
            icon={<FaArrowRightLong />}
            type="navigate"
            handleAction={() => handleNavigateCategory("beauty")}
          />
        </div>
      </div>
      <div className="category-container">
        <Button
          text="shop furniture"
          icon={<FaArrowRightLong />}
          type="navigate"
          handleAction={() => handleNavigateCategory("furniture")}
        />
        <div className="category-images">
          {data?.products.map((product) => {
            if (product.category === "furniture") {
              return (
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  key={product.id}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="grid">
        <div className="row">
          <div className="img-container">
            <img
              src={data?.products[29].thumbnail}
              alt={data?.products[29].title}
            />
          </div>
          <div className="text-container">
            <h2>Fresh Groceries</h2>
            <Button
              text="browse products"
              icon={<FaArrowRightLong />}
              type="navigate"
              handleAction={() => handleNavigateCategory("groceries")}
            />
          </div>
        </div>
        <div className="row">
          <div className="text-container">
            <h2>Popular Perfumes</h2>
            <Button
              text="browse products"
              icon={<FaArrowRightLong />}
              type="navigate"
              handleAction={() => handleNavigateCategory("fragrances")}
            />
          </div>
          <div className="img-container">
            <img
              src={data?.products[7].thumbnail}
              alt={data?.products[7].title}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="home-page">
      {loading ? (
        <PulseLoader color="#a0a0a0" margin={1} size={12} />
      ) : (
        homePageContent
      )}
    </div>
  );
}
