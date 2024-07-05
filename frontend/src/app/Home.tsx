import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/actions.js';
import { useNavigate } from 'react-router-dom';
import Product from '../components/products/Product.js';
import Pagination from '../components/products/Pagination.js';

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
  const [sortOption, setSortOption] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  const navigate = useNavigate();

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const updateItemsPerPage = () => {
    if (window.innerWidth >= 1280) {
      setItemsPerPage(10);
    } else if (window.innerWidth >= 1024) {
      setItemsPerPage(8);
    } else if (window.innerWidth >= 768) {
      setItemsPerPage(6);
    } else if (window.innerWidth >= 640) {
      setItemsPerPage(4);
    } else {
      setItemsPerPage(3);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, products.length, itemsPerPage]);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'priceHighToLow':
        return b.price - a.price;
      case 'priceLowToHigh':
        return a.price - b.price;
      case 'latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <section>
        <div className='mt-8 mb-4 grid lg:flex'>
          <h1 className='font-bold text-3xl text-center mb-6 lg:mb-0'>Products</h1>
          <div className={`flex lg:grid lg:ms-auto ${user.role === 'admin' ? "lg:grid-cols-2" :"lg:grid-cols-1" }`}>
            <select 
              className="w-full lg:w-fit px-4 py-2 border bg-white text-dark-grey text-sm font-semibold rounded"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="latest">Latest Add</option>
              <option value="priceHighToLow">Price High to Low</option>
              <option value="priceLowToHigh">Price Low to High</option>
            </select>
            {user.role === 'admin' && 
              <button 
                className='w-full lg:w-fit ml-4 lg:ml-2 px-6 py-2 border bg-main-purple text-white text-sm font-semibold rounded'
                onClick={handleAddProductClick} 
              >
                Add Product
              </button>
            }
          </div>
        </div>
        <div className="w-full bg-white rounded px-4 py-6 mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-8">
          {paginatedProducts.map((product: Product) => (
            <div key={product._id}>
              <Product role={user.role} userId={user._id} product={product} />
            </div>
          ))}
        </div>
        <div className='flex justify-center md:justify-end'>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default Home;