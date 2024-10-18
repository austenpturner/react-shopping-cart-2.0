import { useSelector } from "react-redux";
import CartCard from "../../components/cartCard";
import { useEffect, useState } from "react";
import useFetchCart from "../../hooks/useFetchCart";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import Button from "../../components/button";
import { PulseLoader } from "react-spinners";

export default function CartPage() {
  const cartLoaded = useFetchCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const cartTotal = useSelector((state) => state.cart.total);
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.users.currentUser);

  function handleLoginRedirect() {
    navigate("/login", { state: { from: "/cart" } });
  }

  function handleShoppingRedirect() {
    navigate("/products");
  }

  useEffect(() => {
    if (!cartLoaded) {
      setLoading(true);
    } else if (cartLoaded && cartItems.length === 0) {
      setTimeout(() => {
        setLoading(false);
      }, "1500");
    } else if (cartLoaded && cartItems.length > 0) {
      setLoading(false);
    }
  }, [cartLoaded, cartItems]);

  const cartElements =
    cartItems.length > 0 ? (
      <div>
        <div className="cart-headers-container">
          <h2>Items</h2>
          <h2>Quantity</h2>
          <h2>Price</h2>
        </div>
        {cartItems.map((item) => {
          return <CartCard key={item.id} item={item} />;
        })}
        <div className="total-container">
          {cartTotal > 0 ? <p>{`Total: $${cartTotal}`}</p> : null}
        </div>
        <div className="login-btn-container">
          {user ? (
            <Button text="check out" type="checkOut" />
          ) : (
            <Button
              handleAction={handleLoginRedirect}
              text="Log in to checkout"
              type="login"
            />
          )}
        </div>
      </div>
    ) : (
      <div>
        <p>Your cart is empty.</p>
        <Button
          text="Go shopping"
          type="navigate"
          handleAction={handleShoppingRedirect}
        />
      </div>
    );

  return (
    <div className="page-container cart-page">
      <h1 className="page-header cart-page-header">Shopping Bag</h1>
      {loading ? (
        <PulseLoader color="#a0a0a0" margin={1} size={12} />
      ) : (
        cartElements
      )}
    </div>
  );
}
