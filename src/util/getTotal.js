export function getTotal(items) {
  if (!Array.isArray(items)) {
    return 0;
  }
  const total = parseFloat(
    items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );
  return total;
}
