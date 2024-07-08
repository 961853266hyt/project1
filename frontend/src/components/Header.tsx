import React, { useEffect }  from 'react';
import { ProfileIcon } from './icons/ProfileIcon';
import { CartIcon } from './icons/CartIcon';
import { SearchIcon } from './icons/SearchIcon';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCartById } from '../redux/actions';

const Header: React.FC<{ onCartIconClick: () => void }> = ({ onCartIconClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    if (user && user._id) {
      dispatch(getCartById(user._id));
    }
  }, [dispatch, user]);

  const handleHome = () => {
    navigate(`/`);
  };

  const handleCartIconClick = () => {
    if (!user) {
      alert('Please log in first');
    } else {
      onCartIconClick();
    }
  };

  const cartTotalPrice = cart?.products.reduce((total, item) => total + item.number * item.product.price, 0) || 0;
  const cartTotal = cart?.products.reduce((total, item) => total + item.number, 0) || 0;

  return (
    <header className="px-8 lg:px-12 fixed top-0 left-0 w-full h-32 lg:h-16 bg-gray-800 text-white justify-around">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-4 gap-4 py-4">

        <div onClick={handleHome} className="cursor-pointer me-auto hidden lg:block col-span-1 order-1">
          <p className="font-bold text-xl">Management <span className="text-xs font-bold">Chuwa</span> </p>
        </div>

        <div onClick={handleHome}  className="cursor-pointer block lg:hidden col-span-1 order-1">
          <p className="font-bold text-xl">M<span className="text-xs font-bold">Chuwa</span> </p>
        </div>

        <label className="block col-span-4 lg:col-span-2 order-3 lg:order-2">
          <div className="flex relative items-center">
            <input type="text" className="w-full lg:w-2/3 rounded py-2 px-4"  placeholder="Search"/>
            <span className="absolute right-0 lg:right-1/3 mr-2"><SearchIcon/></span>
          </div>
        </label>

        <section className="ms-auto w-full col-start-3 col-span-2 md:col-start-4 md:col-span-1 grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-2 order-2 lg:order-3">
          {/* {
            isLogin &&
          } */}
          <div className="flex justify-end col-span-1">
            <ProfileIcon/>
            <p className="ml-1 hidden lg:block">Login</p>
          </div>
          {/* {
            isLogin &&
          } */}
          <div className="flex justify-end col-span-3 sm:col-span-2 lg:col-span-1">
            <div onClick={handleCartIconClick} className='cursor-pointer relative'>
              <CartIcon />
              {cartTotal > 0 && (
                <div className="absolute top-0 right-0 bg-main-red text-white rounded-full text-xs w-4 h-4 flex text-center justify-center items-start">
                  {cartTotal}
                </div>
              )}
            </div>
            <p className="ml-1">${cartTotalPrice.toFixed(2)}</p>
          </div>

        </section>
        
      </div>
    </header>
  );
};

export default Header;