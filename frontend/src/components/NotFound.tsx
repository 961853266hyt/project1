import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate(`/`);
  };
  
  return (
    <div className="relative items-center justify-center">
      <h1 className="text-3xl text-dark-grey font-bold">404 - Page Not Found</h1>
      <button 
        className='mt-6 grid mx-auto px-6 py-2 border bg-main-purple text-white text-lg font-semibold rounded'
        onClick={handleHome} 
      >
        Back to HomePage
      </button>
    </div>
  );
};

export default NotFound;
