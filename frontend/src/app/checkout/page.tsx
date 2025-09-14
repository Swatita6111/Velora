export default function Checkout() {
  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form>
        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Zip Code" />
        <button className="btn">Place Order</button>
      </form>
    </div>
  );
}
