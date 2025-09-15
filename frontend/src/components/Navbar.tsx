import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="navbar px-5">
      <div className="logo">
        <Link href="/">Velora</Link>
      </div>
      <ul className="nav-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/cart"><FaShoppingCart /></Link></li>
        <li><Link href="/auth/login">Login</Link></li>
      </ul>
    </nav>
  );
}
