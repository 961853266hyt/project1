import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart } from '../../redux/actions.js';

interface ProductProps {
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    image_url: string;
    createdBy: string;
    createdAt: Date;
  };
  role: string;
  userId: string;
}

const Product: React.FC<ProductProps> = ({ role, userId, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [editing, setEditing] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<number | null>(null);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id: string) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDetail = (id: string) => {
    navigate(`/product-detail/${id}`);
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await dispatch(updateCart(user._id, productId, 'add'));
    } 
    catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } 
      else {
        alert('An error occurred while adding the product to the cart.');
      }
    }
  };

  const handleUpdateCart = async (productId: string, action: string, number?: number) => {
    try {
      if (action === 'update' && number !== undefined) {
        if (number > product.stock) {
          alert('Cannot exceed stock limit');
          return;
        }
        await dispatch(updateCart(user._id, productId, 'update', number));
      } else {
        await dispatch(updateCart(user._id, productId, action));
      }
    } 
    catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } 
      else {
        alert('An error occurred while updating the product in the cart.');
      }
    }
  };

  const handleEditingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setEditingValue(value);
  };

  const handleEditingBlur = (productId: string) => {
    if (editingValue !== null) {
      handleUpdateCart(productId, 'update', editingValue);
    }
    setEditing(null);
    setEditingValue(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, productId: string) => {
    if (e.key === 'Enter') {
      handleEditingBlur(productId);
    }
  };

  const productInCart = cart.products.find((item) => item.product._id === product._id);

  return(
    <div className="col-span-1 w-full h-72 border border-gray-300 rounded flex flex-col">
      <div onClick={() => handleDetail(product._id)} className="h-2/3 p-2 cursor-pointer">
        {product.image_url && <img src={product.image_url} alt={product.name} className="object-contain w-full h-full grow"/>}
      </div>
      
      <div className="h-1/3 grid grid-cols-2 px-2 pb-1">
        <p onClick={() => handleDetail(product._id)} className="cursor-pointer truncate text-main-grey text-md col-span-2">{product.name}</p>
        <p className="text-black font-bold text-lg col-span-2">${product.price}</p>
        {
          product.stock > 0 && productInCart ? (
            <div className={`h-fit items-center grid grid-cols-3 border border-white rounded bg-main-purple text-white ${userId === product.createdBy ? "col-span-1 mr-2": "col-span-2 mr-0"}`}>
              <button 
                onClick={() => handleUpdateCart(product._id, 'minus')} 
                className="font-bold border-r border-button-grey rounded-y">
                -
              </button>
              {editing === product._id ? (
                <input
                  type="number"
                  value={editingValue !== null ? editingValue : productInCart.number}
                  onChange={handleEditingChange}
                  onBlur={() => handleEditingBlur(product._id)}
                  onKeyDown={(e) => handleKeyDown(e, product._id)}
                  className="w-12 text-center bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoFocus
                />
              ) : (
                <span
                  className="grid mx-auto cursor-pointer"
                  onClick={() => { setEditing(product._id); setEditingValue(productInCart.number); }}
                >
                  {productInCart.number}
                </span>
              )}
              <button 
                onClick={() => handleUpdateCart(product._id, 'add')} 
                className="font-bold border-l border-button-grey rounded-y">
                +
              </button>
            </div>
          ) : (
            product.stock > 0 ? (
              <button 
                onClick={() => handleAddToCart(product._id)} 
                className={`border bg-main-purple text-sm font-semibold text-white px-4 py-0.5 h-fit rounded ${userId === product.createdBy ? "col-span-1 mr-2": "col-span-2 mr-0"}`}>
                Add
              </button>
            ) : (
              <button 
                className={`truncate bg-main-grey text-sm font-semibold text-white px-4 py-1 h-fit rounded ${userId === product.createdBy ? "col-span-1 mr-2": "col-span-2 mr-0"}`}>
                Out of Stock
              </button>
            )
          )
        }

        {role === "admin" && userId === product.createdBy &&
          <button 
            onClick={() => handleEdit(product._id)}
            className="border border-gray-300 col-span-1 bg-white text-sm font-semibold text-main-grey px-4 py-0.5 h-fit rounded">
            Edit
          </button>}
      </div>
    </div>
  );
}

export default Product;