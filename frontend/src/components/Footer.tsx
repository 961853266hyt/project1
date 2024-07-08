import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube } from './icons/Youtube';
import { Twitter } from './icons/Twitter';
import { Facebook } from './icons/Facebook';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-40 lg:h-16 bg-gray-800 text-white justify-between px-8 lg:px-12">
      <section className='max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 relative my-0 lg:my-4 h-8'>
        <p className='mt-4 lg:mt-0 col-span-1 text-center lg:text-start lg:mb-16 order-3 lg:order-1 w-full'>©2024 All Rights Reserved.</p>
        <div className='mt-6 lg:mt-0 col-span-1 grid grid-cols-3 gap-4 mx-auto order-1 lg:order-2'>
          <Youtube />
          <Twitter />
          <Facebook />
        </div>
        <div className='mt-4 lg:mt-0 mcol-span-1 mx-auto lg:mr-16 order-2 lg:order-3 w-full'>
          <div className='grid grid-cols-3 gap-2'>
            <Link to="/fakelinks" className='text-center lg:text-start'>
              Contact Us
            </Link>
            <Link to="/fakelinks" className='text-center'>
              Privacy Policies
            </Link>
            <Link to="/fakelinks" className='text-center lg:text-end'>
              Help
            </Link>
          </div>

        </div>
      </section>
    </footer>
  );
};

export default Footer;