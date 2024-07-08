import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cart from './Cart';

const Layout: React.FC = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  useEffect(() => {
    if (isCartVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isCartVisible]);

  return (
    <div className="px-8 lg:px-12 flex flex-col min-h-screen bg-main-light-gray">
      <Header onCartIconClick={toggleCartVisibility} />
      {isCartVisible && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleCartVisibility} />
          <div className="fixed top-0 right-0 w-full h-full md:w-auto md:h-auto md:top-16 md:right-0 z-50">
            <Cart onClose={toggleCartVisibility} />
          </div>
        </>
      )}
      <main className={`flex grow justify-center items-center w-full max-w-screen-2xl mx-auto my-16 pt-32 pb-40 lg:pt-16 transition-opacity ${isCartVisible ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;