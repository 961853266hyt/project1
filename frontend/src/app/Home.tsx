import React, { useEffect, useState } from 'react';
import Product from '../components/home/Product';

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  image_url: string;
  createdBy: string;
  createdAt: Date;
}

const Home: React.FC = () => {
  // const [users, setUsers] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);
  const user = { role: "admin", _id: "6671626f5993eb8b87c0c194"}
  useEffect(() => {
    fetch('http://localhost:8000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      <section className="px-8 mx-auto my-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
        {products.map((product: Product) => (
          <div key={product._id}>
            <Product role={user.role} userId={user._id} product={product} />
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
