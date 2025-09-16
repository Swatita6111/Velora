"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CartItem from "../../components/CartItem";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3002/cart/1") 
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!cart) return <p className="text-center my-5">Loading cart...</p>;

  const total = cart.items.reduce(
    (sum: number, item: any) => sum + item.price * (item.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    const res = await axios.post("http://localhost:3002/cart/checkout", {
      customerId: 1,
    });
    alert(res.data.message);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row g-3">
        {cart.items.map((item: any) => (
          <div key={item.id} className="col-12">
            <CartItem item={item} />
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-end mt-4 p-3 border-top">
        <h4 className="mb-2">Total: ${total.toFixed(2)}</h4>
        <button
          className="btn bg-black text-white w-auto px-3"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
