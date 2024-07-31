import { useNavigate } from "react-router-dom";
import "./styles.css";
import CartCard from "../../components/cart-card";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  updateCartTotal,
} from "../../store/slices/cart-slice";

export default function ShoppingCartPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function getProductIndex(product) {
    return cartItems.findIndex(
      (cartItem) => cartItem.details.id === product.details.id
    );
  }

  function handleDeleteFromCart(product) {
    const index = getProductIndex(product);
    dispatch(removeFromCart(index));
    dispatch(updateCartTotal(-(product.details.price * product.quantity)));
  }

  function handleProductQuantityChange(product, action) {
    const index = getProductIndex(product);
    if (action === "increase") {
      dispatch(increaseCartQuantity(index));
      dispatch(updateCartTotal(product.details.price));
    } else if (action === "decrease" && cartItems[index].quantity !== 1) {
      dispatch(decreaseCartQuantity(index));
      dispatch(updateCartTotal(-product.details.price));
    } else {
      dispatch(updateCartTotal(-(product.details.price * product.quantity)));
      dispatch(removeFromCart(index));
    }
  }

  return (
    <div className="page">
      <h1>Shopping Cart</h1>
      {cartItems?.length ? (
        <div className="header-container">
          <h2>Product</h2>
          <h2>Quantity</h2>
          <h2>Total price</h2>
        </div>
      ) : null}
      {cartItems?.length > 0 ? (
        <div>
          <hr />
          {cartItems.map((product) => {
            return (
              <CartCard
                product={product}
                handleQuantityChange={handleProductQuantityChange}
                handleDelete={handleDeleteFromCart}
                key={product.details.id}
              />
            );
          })}
          <hr />
        </div>
      ) : (
        <p className="empty-cart-msg">
          Your cart is empty.
          <a
            onClick={() => navigate("/")}
            className="shopping-link"
          >{` Go shopping!`}</a>
        </p>
      )}
      {cartTotal > 0 ? (
        <div className="total-container">
          <div className="cart-total">
            <h4>Cart total:</h4>
            <p>{`$${cartTotal.toFixed(2)}`}</p>
          </div>
          <div className="shipping">
            <h4>Shipping:</h4>
            <p>$4.99</p>
          </div>
          <hr />
          <div className="order-total">
            <h3>Order Total:</h3>
            <p>{`$${(cartTotal + 4.99).toFixed(2)}`}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
