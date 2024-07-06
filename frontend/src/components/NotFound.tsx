import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Exclamation } from './icons/Exclamation';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate(`/`);
  };
  
  return (
    <div className="relative items-center justify-center">
      <span className='flex justify-center'><Exclamation /></span>
      <h1 className="mt-8 text-3xl text-black font-bold">Oops, something went wrong!</h1>
      <button 
        className='mt-8 grid mx-auto px-16 py-2 border bg-main-purple text-white text-lg rounded'
        onClick={handleHome} 
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
