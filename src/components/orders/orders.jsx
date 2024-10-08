import { useNavigate } from "react-router-dom";
import Button from "../button";

export default function Orders() {
  const orders = [];
  const navigate = useNavigate();

  return (
    <>
      <h2 className="page-subheader">orders</h2>
      {orders?.length ? (
        orders.map((order) => {
          <div key={order.index}>{order.name}</div>;
        })
      ) : (
        <div>
          <p>you have no past orders.</p>
          <Button
            text="go shopping"
            type="navigate"
            handleAction={() => navigate("/")}
          />
        </div>
      )}
    </>
  );
}
