import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow justify-center items-center w-full my-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;