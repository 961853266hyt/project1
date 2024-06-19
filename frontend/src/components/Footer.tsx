import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube } from './icons/Youtube';
import { Twitter } from './icons/Twitter';
import { Facebook } from './icons/Facebook';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-40 md:h-16 bg-gray-800 text-white justify-between">
      <section className='grid grid-cols-1 sm:grid-cols-3 relative mx-10 my-0 md:my-4 h-8'>
        <div className='mt-4 md:mt-0 col-span-1 mx-auto md:me-auto order-3 md:order-1'>©2022 All Rights Reserved.</div>
        <div className='mt-8 md:mt-0 col-span-1 grid grid-cols-3 gap-4 mx-auto order-1 md:order-2'>
          <Youtube />
          <Twitter />
          <Facebook />
        </div>
        <div className='mt-4 md:mt-0 mcol-span-1 mx-auto md:ms-auto order-2 md:order-3'>
          <div className='grid grid-cols-3 gap-2'>
            <Link to="/fakelinks" className='mx-auto'>
              Contact Us
            </Link>
            <Link to="/fakelinks" className='mx-auto'>
              Privacy Policies
            </Link>
            <Link to="/fakelinks" className='mx-auto'>
              Help
            </Link>
          </div>

        </div>
      </section>
    </footer>
  );
};

export default Footer;