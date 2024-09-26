import Button from "../button";

export default function Orders() {
  const orders = [];
  return (
    <div>
      <h2>orders</h2>
      {orders?.length ? (
        orders.map((order) => {
          <div key={order.index}>{order.name}</div>;
        })
      ) : (
        <div>
          <p>you have no past orders.</p>
          <Button text="go shopping" />
        </div>
      )}
    </div>
  );
}
