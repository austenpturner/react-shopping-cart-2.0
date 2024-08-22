import { useNavigate } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   increaseCartQuantity,
//   updateCartTotal,
// } from "../../store/slices/cartSlice";
// import ProductDetails from "../../components/product-details";
import { FaArrowLeft } from "react-icons/fa";

export default function ProductDetailsPage() {
  // const params = useParams();
  // const { id } = params;

  const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const { cartItems } = useSelector((state) => state.cart);

  // const { data, loading } = useFetch(`https://dummyjson.com/products/${id}`);

  // function handleAddToCart() {
  //   const index = cartItems.findIndex(
  //     (cartItem) => cartItem.details.id === data.id
  //   );
  //   dispatch(updateCartTotal(data.price));
  //   if (index !== -1) {
  //     dispatch(increaseCartQuantity(index));
  //   } else {
  //     const item = {
  //       details: data,
  //       quantity: 1,
  //     };
  //     dispatch(addToCart(item));
  //   }
  // }

  // console.log(data);

  // if (loading) {
  //   return (
  //     <div className="page">
  //       <p className="loading">Loading product details...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="page">
      <p
        style={{
          cursor: "pointer",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
        <span style={{ marginLeft: "5px" }}>products</span>
      </p>
      {/* {data ? (
        <ProductDetails data={data} handleAddToCart={handleAddToCart} />
      ) : (
        <p>No details found</p>
      )} */}
    </div>
  );
}
