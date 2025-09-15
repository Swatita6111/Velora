import Image from "next/image";

export default function ProductPage() {
  const products = [
    {
      id: 1,
      name: "Elegant Red Dress",
      image: "https://source.unsplash.com/400x300/?red-dress,fashion",
      price: "$120",
    },
    {
      id: 2,
      name: "Classic Black Outfit",
      image: "https://source.unsplash.com/400x300/?black-dress,fashion",
      price: "$150",
    },
    {
      id: 3,
      name: "Casual Summer Look",
      image: "https://source.unsplash.com/400x300/?summer-dress,fashion",
      price: "$90",
    },
    {
      id: 4,
      name: "Modern Streetwear",
      image: "https://source.unsplash.com/400x300/?streetwear,fashion",
      price: "$110",
    },
  ];

  return (
    <main className="container my-5">
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4 g-5">
            <div className="card h-100 shadow-sm position-relative">

              <div className="overflow-hidden" style={{ height: '300px' }}>
                <img
                  src={product.image}
                  className="card-img-top h-100 w-100"
                  style={{ objectFit: 'contain' }}
                  alt={product.name}
                />
              </div>
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <h5 className="card-title text-start">{product.name}</h5>
                <p className="card-text text-start">{product.price}</p>
                <button className="btn bg-black text-white mt-auto">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>

  );
}

