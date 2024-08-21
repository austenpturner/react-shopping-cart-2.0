import { useSelector } from "react-redux";
import CartCard from "../../components/cartCard";
import { useEffect, useState } from "react";
import useFetchCart from "../../hooks/useFetchCart";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import Button from "../../components/button";

export default function CartPage() {
  const cartLoaded = useFetchCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const cartTotal = useSelector((state) => state.cart.total);
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.users.currentUser);

  // console.log(cartLoaded, cartItems);

  function handleLoginRedirect() {
    navigate("/login", { state: { from: "/cart" } });
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

  if (loading) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Loading... </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      {cartItems?.length > 0 ? (
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
              <Button text={"check out"} />
            ) : (
              <p onClick={handleLoginRedirect}>Login to checkout</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Your cart is empty.</p>
          <Link to={"/"}>Go shopping</Link>
        </div>
      )}
    </div>
  );
}
