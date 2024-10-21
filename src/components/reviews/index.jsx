export default function Reviews() {
  const orders = [];
  return (
    <>
      <h1 className="page-header">Reviews</h1>
      {orders?.length ? (
        orders.map((order) => {
          <div key={order.index}>{order.name}</div>;
        })
      ) : (
        <div>
          <p>{`You haven't left any reviews.`}</p>
        </div>
      )}
    </>
  );
}
