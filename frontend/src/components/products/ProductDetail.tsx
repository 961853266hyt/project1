import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../../redux/actions.js';

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

interface User {
  _id: string;
  role: string;
}


const ProductDetail: React.FC = () => {
  const { productID } = useParams<{ productID: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const user = useSelector((state: { user: User }) => state.user);

  useEffect(() => {
    if (productID) {
      const fetchData = async () => {
        const fetchedProduct = await dispatch(getProductById(productID)) as Product;
        setProduct(fetchedProduct);
      };
      fetchData();
    }
  }, [dispatch, productID]);

  if (!user || !product){
    return <div> Loading... </div>
  }

  const handleEdit = (productId: string) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <section className='w-full'>
      <h1 className='font-bold text-3xl text-center md:text-start'>Products</h1>
      <div className='h-max md:h-[80vh] mt-4 bg-white rounded grid grid-cols-1 md:grid-cols-2'>
        <div className="object-contain mt-4 col-span-1 w-full h-[30vh] md:h-[70vh]">
          {product.image_url && <img src={product.image_url} alt={product.name} className="m-auto object-contain h-full w-auto grow p-8"/>}
        </div>
        
        <div className="mt-16 ml-20 mr-4 mb-4 col-span-1">
          <h4 className='text-main-grey text-sm md:text-base'>{product.category}</h4>
          <h2 className="mt-2 cursor-pointer truncate text-dark-grey text-xl md:text-3xl font-bold">{product.name}</h2>
          <div className='mt-4 grid grid-cols-4'>
            <h2 className="truncate text-black font-bold text-xl md:text-3xl">${product.price}</h2>
            {product.stock === 0 &&
              <div className='text-stock-orange text-xs bg-stock-orange bg-opacity-10 rounded text-center p-2'>
                Out of Stock
              </div>
            }
          </div>
          <p className='mt-4 text-main-grey text-sm md:text-base font-medium'>{product.description}</p>
          <div className='grid grid-cols-2 md:grid-cols-4'>
            {
              product.stock > 0 &&
                <button className={`mt-8 bg-main-purple text-sm font-semibold text-white px-4 py-1 h-fit rounded ${user._id === product.createdBy ? "mr-2 col-span-1 md:col-span-1": "mr-0 col-span-2 md:col-span-1" } `}>Add</button>
            }
            {
              product.stock <= 0 &&
                <button className={`mt-8 bg-main-grey text-sm font-semibold text-white px-4 py-1 h-fit rounded ${user._id === product.createdBy ? "mr-2 col-span-1 md:col-span-1": "mr-0 col-span-2 md:col-span-1" } `}>out of Stock</button>
            }

            {user.role === "admin" && user._id === product.createdBy &&
              <button 
                onClick={() => handleEdit(productID)}
                className="mt-8 border border-gray-300 bg-white text-sm font-semibold text-main-grey px-4 py-1 h-fit rounded col-span-1 md:col-span-1">
                Edit
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;