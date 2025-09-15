import CartItem from '../../components/CartItem';

const cartItems = [
  { id: 1, name: 'Sneakers', price: 120, quantity: 1, image: '/images/sneakers.jpg' },
  { id: 2, name: 'Backpack', price: 80, quantity: 2, image: '/images/backpack.jpg' },
];

export default function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row g-3">
        {cartItems.map((item) => (
          <div key={item.id} className="col-12">
            <CartItem item={item} />
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-end mt-4 p-3 border-top">
        <h4 className="mb-2">Total: ${total.toFixed(2)}</h4>
        <button className="btn bg-black text-white w-auto px-3">Proceed to Checkout</button>
      </div>

    </div>
  );
}
