import CartItem from '../../components/CartItem';

const cartItems = [
  { id: 1, name: 'Sneakers', price: 120, quantity: 1 },
  { id: 2, name: 'Backpack', price: 80, quantity: 2 },
];

export default function Cart() {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <h3>Total: ${total}</h3>
      <button className="btn">Proceed to Checkout</button>
    </div>
  );
}
