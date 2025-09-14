import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: 'Sneakers', price: 120, image: '/products/sneakers.jpg' },
  { id: 2, name: 'Backpack', price: 80, image: '/products/backpack.jpg' },
  { id: 3, name: 'Watch', price: 200, image: '/products/watch.jpg' },
];

export default function Home() {
  return (
    <div className="home-container">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
