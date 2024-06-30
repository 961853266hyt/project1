import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions.js';
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
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section className="max-w-screen-2xl px-8 mx-auto my-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
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