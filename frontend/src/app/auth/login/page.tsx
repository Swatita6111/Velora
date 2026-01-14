"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';
import '../auth.css';

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

      // SweetAlert success
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${res.data.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Save user info
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("customerId", res.data.id);

      // Navigate to home
      router.push("/");
    } catch (err: any) {
      // SweetAlert error
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.message || "Please try again",
      });
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">

          {/* LEFT BRAND PANEL */}
          <div className="col-md-6 d-none d-md-block brand-panel">
            <h1 className="d-flex align-items-center gap-2">
              <i className="bi bi-bag-check-fill"></i>
              Velora
            </h1>
            <p className="lead">
              Shop smarter. Faster. Better.
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
              alt="shopping"
              className="img-fluid mt-4"
              width="280"
            />
          </div>

          {/* RIGHT FORM */}
          <div className="col-md-4">
            <div className="auth-card p-4 mb-5">
              <h3 className="fw-bold">Welcome Back</h3>
              <p className="text-muted mb-4">
                Login to your Velora account
              </p>

              {error && (
                <div className="alert alert-danger py-2">
                  {error}
                </div>
              )}

              <div className="mb-4">
                <label className="form-label">Email</label>
                <input
                  className="form-control"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                className="btn auth-btn text-white w-100 py-2"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>

              <p className="text-center mt-3 mb-0">
                New here?{" "}
                <Link href="/auth/register" className="text-decoration-none">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
