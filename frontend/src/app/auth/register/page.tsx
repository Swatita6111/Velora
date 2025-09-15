import Link from 'next/link';

export default function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f0f0f0" }}>
      <div className="p-5 shadow-md bg-white" style={{ width: '450px', maxWidth: '90%' }}>
        <h2 className="text-black auth-title">Register</h2>

        <div className="auth-message mb-4">
          Fill out the form below to create your account
        </div>

        {/* Name */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" className="form-control" placeholder="Enter your name" />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" className="form-control" placeholder="Enter your email" />
        </div>

        {/* Phone Number */}
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input type="tel" id="phone" className="form-control" placeholder="Enter your phone number" />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter your password" />
        </div>

        {/* Register Button */}
        <button className="btn bg-black text-white w-100">Register</button>

        {/* Link to login */}
        <p className="mt-3 text-grey text-center">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-decoration-none" style={{ color: "#667eea" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
