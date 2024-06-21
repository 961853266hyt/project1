import React from 'react';
import { ProfileIcon } from './icons/ProfileIcon';
import { CartIcon } from './icons/CartIcon';
import { SearchIcon } from './icons/SearchIcon';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-32 lg:h-16 bg-gray-800 text-white justify-around">
      <div className="grid grid-cols-4 gap-4 my-4 mx-4 lg:mx-16">

        <div className="hidden lg:block col-span-1 order-1">
          <p className="font-bold text-xl">Management <span className="text-xs font-bold">Chuwa</span> </p>
        </div>

        <div className="block lg:hidden col-span-1 order-1">
          <p className="font-bold text-xl">M<span className="text-xs font-bold">Chuwa</span> </p>
        </div>

        <label className="block col-span-4 lg:col-span-2 order-3 lg:order-2">
          <div className="flex relative items-center">
            <input type="text" className="w-full lg:w-2/3 rounded py-2 px-4"  placeholder="Search"/>
            <span className="absolute right-0 lg:right-1/3 mr-2"><SearchIcon/></span>
          </div>
        </label>

        <section className="ms-auto w-full lg:w-4/5 col-start-3 col-span-2 md:col-start-4 md:col-span-1 grid grid-cols-2 order-2 lg:order-3">
          <div className="col-span-1 grid grid-cols-2">
            <div className="col-span-1 col-start-2 lg:col-start-1">
              <ProfileIcon/>
            </div>
            {/* {
              isLogin &&
            } */}
            <p className="hidden lg:block col-span-1">Login</p>
          </div>
          <div className="col-span-1 grid grid-cols-2">
            <div className="col-span-1">
              <CartIcon/>
            </div>
            {/* {
              isLogin &&
            } */}
            <p className="col-span-1">$0.0</p>
          </div>

        </section>
        
      </div>
    </header>
  );
};

export default Header;