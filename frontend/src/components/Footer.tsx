export default function Footer() {
  return (
    <footer className="bg-black text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* About / Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Velora</h5>
            <p className="mb-1">Swatita Ray Nayak</p>
            <p className="mb-1">swatitaraynayak2001@gmail.com</p>
            <p className="mb-1"> +91 7205231746</p>
            <p className="mb-1">123 Main Street, City, Country</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/products" className="text-white text-decoration-none">Products</a></li>
              <li><a href="/cart" className="text-white text-decoration-none">Cart</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-4">
            <h5 className="mb-3">Follow Us</h5>
            <div className="d-flex">
              <a
                href="https://www.linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4 me-3"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://www.facebook.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4 me-3"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-4"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="text-center mb-0">&copy; 2025 Velora. All rights reserved.</p>
      </div>
    </footer>
  );
}
