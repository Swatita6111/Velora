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
      <nav
        className="navbar navbar-expand-lg px-5"
        style={{
          backgroundColor: "#0f766e",
          height: "70px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          borderBottom: "1px solid rgba(255,255,255,0.2)", 
        }}
      >


        {/* Logo */}
        <Link
          href="/"
          className="navbar-brand fw-bold fs-4"
          style={{ color: "#fff", letterSpacing: "1px" }}
        >
          Velora
        </Link>

        {/* Right menu */}
        <ul className="navbar-nav ms-auto d-flex align-items-center gap-4">
          {/* Home */}
          <li className="nav-item">
            <Link
              href="/"
              className="nav-link"
              style={{ color: "#fff" }}
            >
              Home
            </Link>
          </li>

          {/* Cart */}
          <li className="nav-item">
            <Link
              href="/cart"
              className="nav-link fs-5"
              style={{ color: "#fff" }}
            >
              <FaShoppingCart />
            </Link>
          </li>

          {/* Auth */}
          {isAuthenticated ? (
            <li className="nav-item">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt={customerName}
                className="rounded-circle"
                style={{
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                  objectFit: "cover",
                  border: "2px solid white",
                }}
                onClick={() => setShowModal(true)}
              />
            </li>
          ) : (
            <li className="nav-item">
              <Link
                href="/auth/login"
                className="btn btn-outline-light btn-sm px-3"
              >
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
