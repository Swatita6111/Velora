"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/customers", {
        name,
        email,
        phone,
        password,
      });

      alert("Registration successful! You can now login.");
      router.push("/auth/login");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div className="p-5 shadow-md bg-white" style={{ width: "450px", maxWidth: "90%" }}>
        <h2 className="text-black auth-title">Register</h2>

        <div className="auth-message mb-4">
          Fill out the form below to create your account
        </div>

        {error && <p className="text-danger mb-3">{error}</p>}

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Register Button */}
        <button
          className="btn bg-black text-white w-100"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Link to login */}
        <p className="mt-3 text-grey text-center">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-decoration-none"
            style={{ color: "#667eea" }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
