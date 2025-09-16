"use client";

import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [showModal, setShowModal] = useState(false); 
 const router = useRouter();
 
  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    const name = localStorage.getItem("name");
    if (customerId) {
      setIsAuthenticated(true);
      setCustomerName(name || "User");
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customerId");
    localStorage.removeItem("name");
    setIsAuthenticated(false);
    setShowModal(false);
    router.push("/"); 
  };

  return (
    <>
      <nav className="navbar px-5">
        <div className="logo">
          <Link href="/">Velora</Link>
        </div>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/cart"><FaShoppingCart /></Link></li>
          {isAuthenticated ? (
            <li className="nav-item">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png" // user icon
                alt={customerName}
                className="rounded-circle"
                style={{ cursor: "pointer", width: "35px", height: "35px", objectFit: "cover" }}
                onClick={() => setShowModal(true)}
              />

            </li>
          ) : (
            <li className="nav-item">
              <Link href="/auth/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {showModal && (
        <div
          className="position-absolute"
          style={{
            top: "60px", // adjust based on navbar height
            right: "20px",
            width: "200px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <div className="p-3">
            <h6 className="">Hello, {customerName}</h6>
            <Link
              href="/orders"
              className="btn text-start w-100"
              onClick={() => setShowModal(false)}
            >
              Order History
            </Link>
            <button
              className="btn btn-danger w-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}

    </>
  );
}
