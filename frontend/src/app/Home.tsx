import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions.js';
import { useNavigate } from 'react-router-dom';
import Product from '../components/Product.js';

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
  
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className='mt-8 mb-4 grid lg:flex'>
          <h1 className='font-bold text-3xl text-center mb-6 lg:mb-0'>Products</h1>
          {user.role === 'admin' && 
            <button 
              className='ms-auto px-6 py-2 border bg-main-purple text-white text-sm font-semibold rounded'
              onClick={handleAddProductClick} 
            >
              Add Product
            </button>
          }
        </div>
        <div className="bg-white rounded px-4 py-6 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-8">
          {products.map((product: Product) => (
            <div key={product._id}>
              <Product role={user.role} userId={user._id} product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;