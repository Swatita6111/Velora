import Link from "next/link";

export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>

        {/* Info message */}
        <div className="auth-message info">Login to continue to your account</div>

        {/* Example error message */}
        {/* <div className="auth-message error">Invalid email or password. Please try again.</div> */}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>

        <button className="btn">Login</button>
        <p>
          Don&apos;t have an account? <Link href="/auth/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
