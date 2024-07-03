import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="px-8 lg:px-12 flex flex-col min-h-screen bg-main-light-gray">
      <Header />
      <main className="flex flex-grow justify-center items-center w-full max-w-screen-2xl mx-auto my-16 pt-32 pb-40 lg:pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;