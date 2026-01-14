"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:3002/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (productId: number) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((c: any) => c.productId === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // SweetAlert
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: "Product has been added to your cart!",
      showConfirmButton: false,
      timer: 1500,
      background: "#f0f0f0",
      color: "#333",
    });
  };


  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <main className="container my-5">
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-3 mb-4 g-5">
              <div className="card h-100 shadow-sm position-relative">
                <div className="overflow-hidden" style={{ height: "250px" }}>
                  <img
                    src={product.image}
                    className="card-img-top h-70 w-70"
                    style={{ objectFit: "contain" }}
                    alt={product.name}
                  />
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5 className="card-title text-start">{product.name}</h5>
                  <p className="text-muted text-start small">
                    Stylish and comfortable — perfect for daily wear.
                  </p>
                  <p className="card-text text-start">${product.price}</p>
                  <button
                    className="btn text-white mt-auto"
                    style={{backgroundColor:"#0f766e"}}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
