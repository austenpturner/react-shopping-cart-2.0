export default function Reviews() {
  const orders = [];
  return (
    <>
      <h2 className="page-subheader">reviews</h2>
      {orders?.length ? (
        orders.map((order) => {
          <div key={order.index}>{order.name}</div>;
        })
      ) : (
        <div>
          <p>{`you haven't left any reviews.`}</p>
        </div>
      )}
    </>
  );
}
