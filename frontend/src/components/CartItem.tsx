export default function CartItem({ item }: any) {
  return (
    <div className="card shadow-sm">
      <div className="card-body d-flex align-items-center">
        {/* Product Image */}
        <img
          src={item.image}
          alt={item.name}
          className="img-fluid me-3"
          style={{ width: '80px', height: '80px', objectFit: 'contain' }}
        />

        {/* Product Details */}
        <div className="flex-grow-1">
          <h6 className="card-title mb-1">{item.name}</h6>
          <p className="mb-1 text-muted">Quantity: {item.quantity}</p>
        </div>

        {/* Price */}
        <div>
          <p className="mb-0 fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
