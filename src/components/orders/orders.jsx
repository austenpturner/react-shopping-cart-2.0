import Button from "../button";

export default function Orders() {
  const orders = [];
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
          <Button text="go shopping" type="navigate" />
        </div>
      )}
    </>
  );
}
