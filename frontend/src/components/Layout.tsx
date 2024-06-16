import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-16 mb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;