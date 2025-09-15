import Link from "next/link";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="p-5 rounded bg-white mb-5" style={{ width: '400px', maxWidth: '90%' }}>
        <h2 className="text-black auth-title">Login</h2>

        {/* Info message */}
        <div className="auth-message mb-4">
          Login to continue to your account
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter your password" />
        </div>

        <button className="btn bg-black text-white w-100">Login</button>

        <p className="mt-3 text-center text-grey">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-decoration-none" style={{ color: "#667eea"}}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
