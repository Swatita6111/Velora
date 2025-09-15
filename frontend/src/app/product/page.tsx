import { useParams } from 'next/navigation';

export const products = [
  { id: 1, name: 'Sneakers', price: 120, image: '/products/sneakers.jpg', description: 'Comfortable sports sneakers' },
  { id: 2, name: 'Backpack', price: 80, image: '/products/backpack.jpg', description: 'Durable travel backpack' },
  { id: 3, name: 'Watch', price: 200, image: '/products/watch.jpg', description: 'Stylish wrist watch' },
  { id: 4, name: 'Headphones', price: 150, image: '/products/headphones.jpg', description: 'Noise-cancelling headphones' },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />  
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button className="btn">Add to Cart</button>
    </div>
  );
}
