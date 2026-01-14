"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

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

        const productsData = await Promise.all(
          cart.map(async (item: any) => {
            const res = await axios.get(
              `http://localhost:3002/orders/cart/${item.productId}`
            );
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

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    const customerId = localStorage.getItem("customerId") || 101; // fallback
    try {
      for (const item of cartItems) {
        await axios.post("http://localhost:3002/orders", {
          customerId,
          productId: item.id,
          quantity: item.quantity,
        });
      }

      // SweetAlert success
      await Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: "Your order has been placed successfully!",
        timer: 2500,
        showConfirmButton: false,
      });

      localStorage.removeItem("cart");
      setCartItems([]);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Something went wrong, please try again.",
      });
    }
  };

  if (loading)
    return <p className="text-center my-5 fs-5">Loading cart...</p>;
  if (cartItems.length === 0)
    return <p className="text-center my-5 fs-5">Your cart is empty</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Shopping Cart</h2>

      <div className="row g-4">
        {cartItems.map((item, index) => (
          <div key={item.id} className="col-md-6 col-lg-4 position-relative">
            <div className="card shadow-sm h-100 border-0">

              {/* Remove Button */}
              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                style={{
                  zIndex: 10,
                  width: "28px",
                  height: "28px",
                  padding: "0",
                  fontSize: "16px",
                  lineHeight: "28px",
                  borderRadius: "20%",
                }}
                onClick={() => {
                  const updatedCart = cartItems.filter((_, i) => i !== index);
                  setCartItems(updatedCart);
                  localStorage.setItem(
                    "cart",
                    JSON.stringify(updatedCart.map((c) => ({ productId: c.id, quantity: c.quantity })))
                  );
                  Swal.fire({
                    icon: "success",
                    title: "Removed",
                    text: `${item.name} has been removed from the cart.`,
                    timer: 1200,
                    showConfirmButton: false,
                  });
                }}
              >
                &times;
              </button>

              <div
                className="position-relative"
                style={{ height: "250px", overflow: "hidden" }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top h-100 w-100"
                  style={{ objectFit: "cover" }}
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-25 d-flex justify-content-center align-items-center">
                  <h5 className="text-white text-center">{item.name}</h5>
                </div>
              </div>

              <div className="card-body d-flex flex-column justify-content-between">
                <p className="text-muted mb-1">
                  Price: ${item.price} x {item.quantity}
                </p>
                <p className="fw-bold mb-3">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex flex-column align-items-end mt-4 gap-2">
        <h4 className="mb-1">Total: ${total.toFixed(2)}</h4>
        <button
          className="btn btn-success"
          style={{ padding: "0.65rem 0.75rem", fontSize: "1rem", width: "120px" }}
          onClick={() => {
            const customerId = localStorage.getItem("customerId");
            if (!customerId) {
              Swal.fire({
                icon: "warning",
                title: "Login Required",
                text: "Please login to proceed to checkout.",
              });
              return;
            }
            handleCheckout();
          }}
        >
          Checkout
        </button>
      </div>
    </div>

  );
}
