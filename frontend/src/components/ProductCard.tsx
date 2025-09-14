import Link from 'next/link';

export default function ProductCard({ product }: any) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link href={`/product/${product.id}`} className="btn">View Details</Link>
    </div>
  );
}
