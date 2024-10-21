import { useNavigate } from "react-router-dom";
import Button from "../button";

export default function Orders() {
  const orders = [];
  const navigate = useNavigate();

  return (
    <>
      <h1 className="page-header">Orders</h1>
      {orders?.length ? (
        orders.map((order) => {
          <div key={order.index}>{order.name}</div>;
        })
      ) : (
        <div>
          <p>You have no past orders.</p>
          <Button
            text="go shopping"
            type="navigate"
            handleAction={() => navigate("/products")}
          />
        </div>
      )}
    </>
  );
}
