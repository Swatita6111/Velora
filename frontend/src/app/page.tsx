import Link from "next/link";
import ProductPage from "./product/page";

export default function Home() {
  return (
    <div className="container text-center my-5">
      <h1>Welcome to Our Store</h1>
      <p className="lead">Discover our latest collection of fashion & accessories.</p>
      <ProductPage />
    </div>
  );
}
