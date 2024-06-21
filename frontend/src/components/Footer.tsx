import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube } from './icons/Youtube';
import { Twitter } from './icons/Twitter';
import { Facebook } from './icons/Facebook';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-40 lg:h-16 bg-gray-800 text-white justify-between">
      <section className='max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 relative px-10 lg:px-0 my-0 lg:my-4 h-8'>
        <div className='mt-4 lg:mt-0 col-span-1 mx-auto lg:m-16 order-3 lg:order-1 w-full'>©2022 All Rights Reserved.</div>
        <div className='mt-8 lg:mt-0 col-span-1 grid grid-cols-3 gap-4 ms-auto order-1 lg:order-2'>
          <Youtube />
          <Twitter />
          <Facebook />
        </div>
        <div className='mt-4 lg:mt-0 mcol-span-1 mx-auto lg:mr-16 order-2 lg:order-3 w-full'>
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