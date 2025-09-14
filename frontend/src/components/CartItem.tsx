export default function CartItem({ item }: any) {
  return (
    <div className="cart-item">
      <p>{item.name} x {item.quantity}</p>
      <p>${item.price * item.quantity}</p>
    </div>
  );
}
