"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3001/customers/login", {
        email,
        password,
      });

      localStorage.setItem("name", res.data.name);
      localStorage.setItem("customerId", res.data.id);

      router.push("/"); 
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <div
        className="p-5 rounded bg-white mb-5"
        style={{ width: "400px", maxWidth: "90%" }}
      >
        <h2 className="text-black auth-title">Login</h2>

        <div className="auth-message mb-4">
          Login to continue to your account
        </div>

        {error && <p className="text-danger mb-3">{error}</p>}

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="btn bg-black text-white w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-3 text-center text-grey">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-decoration-none"
            style={{ color: "#667eea" }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
