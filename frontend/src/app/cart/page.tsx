"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        if (cart.length === 0) {
          setCartItems([]);
          return;
        }

        // Use Promise.all instead of for..of + await
        const productsData = await Promise.all(
          cart.map(async (item: any) => {
            const res = await axios.get(`http://localhost:3002/orders/cart/${item.productId}`);
            return { ...res.data, quantity: item.quantity };
          })
        );

        setCartItems(productsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const customerId = 101; // example customer id
    try {
      for (const item of cartItems) {
        await axios.post("http://localhost:3002/orders", {
          customerId,
          productId: item.id,
          quantity: item.quantity,
        });
      }
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  if (loading) return <p className="text-center my-5">Loading cart...</p>;
  if (cartItems.length === 0) return <p className="text-center my-5">Cart is empty</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Shopping Cart</h2>

      <div className="row g-3">
        {cartItems.map((item) => (
          <div key={item.id} className="col-12 d-flex align-items-center border-bottom py-2">
            <img src={item.image} width={80} className="me-3" />
            <div>
              <h5>{item.name}</h5>
              <p>${item.price} x {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-end mt-4 p-3 border-top">
        <h4 className="mb-2">Total: ${total.toFixed(2)}</h4>
        <button
          className="btn bg-black text-white w-auto px-3"
          onClick={() => {
            const customerId = localStorage.getItem("customerId");
            if (!customerId) {
              alert("Please login to proceed to checkout.");
              return;
            }
            handleCheckout();
          }}
        >
          Proceed to Checkout
        </button>

      </div>
    </div>
  );
}
