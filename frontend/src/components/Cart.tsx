import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartById, updateCart } from '../redux/actions';

const Cart: React.FC<{onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  const [zipCode, setZipCode] = useState('');
  const [tax, setTax] = useState(0);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleModifyItemNumber = (productId: string, currentNumber: number) => {
    setEditingItemId(productId);
    setEditingValue(currentNumber);
  };

  const handleUpdateCart = (productId: string, action: string) => {
    const product = cart.products.find(item => item.product._id === productId);
    if (action === 'add' && product.number >= product.product.stock) {
      alert('Cannot add more than available stock');
      return;
    }
    dispatch(updateCart(user._id, productId, action));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(Number(e.target.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, productId: string) => {
    if (e.key === 'Enter') {
      handleBlur(productId);
    }
  };

  const handleBlur = (productId: string) => {
    const product = cart.products.find(item => item.product._id === productId);
    if (editingValue > product.product.stock) {
      alert('Cannot exceed stock limit');
    } else {
      dispatch(updateCart(user._id, productId, 'update', editingValue));
    }
    setEditingItemId(null);
  };

  const handleRemove = (productId: string) => {
    dispatch(updateCart(user._id, productId, 'remove'));
  };

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZipCode(e.target.value);
    // Simple tax calculation based on zip code
    const taxRate = e.target.value === '22202' ? 0.06 : 0;
    setTax(taxRate);
  };

  const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleCouponClickn = () => {
    if (couponCode === '20OFF') {
      setDiscount(20);
      alert('Coupon applied successfully!');
    } 
    else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  useEffect(() => {
    if (user._id) {
      dispatch(getCartById(user._id));
    }
  }, [dispatch, user._id]);

  const cartTotalPrice = cart?.products.reduce((total, item) => total + item.number * item.product.price, 0) || 0;
  const totalPriceWithTax = cartTotalPrice + (cartTotalPrice * tax);
  const cartTotal = cart?.products.reduce((total, item) => total + item.number, 0) || 0;

  return (
    <div className="relative max-h-screen z-50 overflow-y-auto w-full md:w-[544px] bg-white shadow-lg rounded-lg ">
      <div className='bg-main-purple w-full h-20 text-start text-white flex'>
        <h2 className="ml-4 md:ml-8 mt-5 text-2xl md:text-3xl font-bold mb-4">Cart</h2><span className='mt-7 ml-3 text-sm md:text-md'>({cartTotal})</span>
        <button onClick={onClose} className='grid ms-auto my-auto mr-4 text-3xl'>&times;</button>
      </div>
      
      <ul className='m-4 md:m-8'>
        {cart?.products.map(item => (
          <li key={item.product._id} className="grid grid-cols-4 mb-4 md:mb-8">
            <img src={item.product.image_url} alt={item.product.name} className="col-span-1 w-28 h-28 object-contain" />
            <div className="ml-4 w-full col-span-3 grid grid-cols-3 gap-y-3">
              <p className='col-span-2 text-lg md:text-xl font-bold truncate'>{item.product.name}</p>
              <p className='col-span-1 text-lg md:text-xl flex justify-end text-main-purple font-semibold mr-4 md:mr-0'>${item.product.price.toFixed(2)}</p>

              <div className="w-4/5 h-fit mt-auto items-center grid grid-cols-3 border border-button-grey rounded text-button-grey">
                <button 
                  onClick={() => handleUpdateCart(item.product._id, 'minus')} 
                  className="font-bold border-r border-button-grey rounded-y">
                  -
                </button>
                {editingItemId === item.product._id ? (
                  <input
                    type="number"
                    value={editingValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => handleKeyDown(e, item.product._id)}
                    onBlur={() => handleBlur(item.product._id)}
                    className="w-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    autoFocus
                  /> ) : (
                  <span
                    className="grid mx-auto cursor-pointer text-main-black"
                    onClick={() => handleModifyItemNumber(item.product._id, item.number)}
                  >
                    {item.number}
                  </span>
                )}
                <button 
                  onClick={() => handleUpdateCart(item.product._id, 'add')} 
                  className="font-bold border-l border-button-grey rounded-y">
                  +
                </button>
              </div>

              <button 
                onClick={() => handleRemove(item.product._id)}
                className='col-start-3 grid mt-auto ms-auto underline text-main-grey text-sm md:text-base font-medium mr-4 md:mr-0'>
                Remove
              </button>
            </div>

          </li>
        ))}
      </ul>

      <div className='mx-4 md:mx-8 text-main-black text-sm md:text-base font-semibold'>
        <h4 className='text-sm font-semibold text-main-grey'>Apply Discount Code</h4>
        <div className='mt-2 grid grid-cols-5'>        
          <input
            type="text"
            value={couponCode}
            onChange={handleCouponCodeChange}
            className="w-full px-4 py-2 border rounded col-span-4"
            placeholder="Enter Coupon Code"
          />
        <button onClick={handleCouponClickn} className='ml-2 col-span-1 w-full px-4 py-1 border bg-main-purple text-white rounded font-bold'>Apply</button>
        </div>
      </div>
      

      <div className="mt-8 px-4 md:px-8 shadow-[0_0px_30px_-20px_rgba(0,0,0,0.5)] border-t text-main-black grid grid-cols-2 text-sm md:text-base font-semibold">
        <input
            type="zip"
            value={zipCode}
            onChange={handleZipCodeChange}
            className="w-full px-2 py-1 mt-4 border rounded col-span-2"
            placeholder="Enter ZIP code"
          />
      
        <p className="col-span-1 flex me-auto mt-4 text-base md:text-lg font-bold">Subtotal:</p>
        <p className='col-span-1 flex ms-auto mt-4'>${cartTotalPrice.toFixed(2)}</p>
        
        <p className="col-span-1 flex me-auto mt-4 text-base md:text-lg font-bold">Tax: </p>
        <p className='col-span-1 flex ms-auto mt-4'>${(cartTotalPrice * tax).toFixed(2)}</p>

        <p className="col-span-1 flex me-auto mt-4 text-base md:text-lg font-bold">Discount: </p>
        <p className='col-span-1 flex ms-auto mt-4'>-${discount.toFixed(2)}</p>

        <p className="col-span-1 flex me-auto mt-4 text-base md:text-lg font-bold">Estimated total: </p>
        <p className='col-span-1 flex ms-auto mt-4'>${totalPriceWithTax.toFixed(2) - discount}</p>

        <button className='my-4 col-span-2 w-full px-6 py-2 border bg-main-purple text-white rounded'>
          Continue to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;