// import Button from "../button";

export default function Reviews() {
  const orders = [];
  return (
    <div>
      <h2>reviews</h2>
      {orders?.length ? (
        orders.map((order) => {
          <div key={order.index}>{order.name}</div>;
        })
      ) : (
        <div>
          <p>{`you haven't left any reviews.`}</p>
          {/* <Button text="review a product" /> */}
        </div>
      )}
    </div>
  );
}
