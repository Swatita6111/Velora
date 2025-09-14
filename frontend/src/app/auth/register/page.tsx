import Link from 'next/link';

export default function Register() {
  return (
    <div className="auth-page">
      <h2>Register</h2>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button className="btn">Register</button>
      <p>Already have an account? <Link href="/auth/login">Login</Link></p>
    </div>
  );
}
