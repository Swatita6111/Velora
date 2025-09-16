"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const customerId = 101; 

  useEffect(() => {
    async function fetchOrders() {
      const res = await axios.get(`http://localhost:3002/orders/customer/${customerId}`);
      setOrders(res.data);
    }
    fetchOrders();
  }, []);

  if (orders.length === 0) return <p className="text-center my-5">No orders yet.</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Order History</h2>
      {orders.map((order) => (
        <div key={order.id} className="row mb-3 border-bottom pb-2">
          <div className="col-md-2">
            <img src={order.product.image} width={80} />
          </div>
          <div className="col-md-8">
            <h5>{order.product.name}</h5>
            <p>${order.product.price} x {order.quantity}</p>
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <span>Status: {order.status || "pending"}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
