"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import '../auth.css';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post("http://localhost:3001/customers", form);

      // SweetAlert success
      await Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully! You can now login.",
        timer: 2500,
        showConfirmButton: false,
      });

      router.push("/auth/login");
    } catch (err: any) {
      // SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Please try again",
      });

      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center">

          <div className="col-md-6 d-none d-md-block brand-panel">
            <h1>Join Velora</h1>
            <p className="lead">
              Discover products you’ll love
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170576.png"
              className="img-fluid mt-4"
              width="250"
            />
          </div>

          <div className="col-md-4">
            <div className="auth-card p-4 mb-5">
              <h3 className="fw-bold mb-1">Create Account</h3>
              <p className="text-muted mb-4">
                Join Velora and start shopping smarter today
              </p>

              {error && (
                <div className="alert alert-danger py-2">
                  {error}
                </div>
              )}

              {["name", "email", "phone", "password"].map((field) => (
                <div className="mb-3" key={field}>
                  <label className="form-label text-capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    className="form-control"
                    placeholder={`Enter ${field}`}
                    value={(form as any)[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                  />
                </div>
              ))}

              <button
                className="btn auth-btn text-white w-100 py-2"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Creating account..." : "Register"}
              </button>

              <p className="text-center mt-3 mb-0">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
