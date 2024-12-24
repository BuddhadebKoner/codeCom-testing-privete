import React, { useEffect } from 'react';
import Sidebar from '../components/shared/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BigLoader from '../components/shared/BigLoader';

const RootLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen bg-gray-800 text-gray-200 flex flex-col items-center justify-between z-50 p-10">
        <img
          width={150}
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          src="codecommLogo.svg" alt="codecomm-logo"
        />
        <div className='w-fit h-fit flex flex-col items-center justify-center mt-auto'>
          <p>Form</p>
          <p className='text-xl font-semibold text-blue-400'>CodeComm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex relative">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="w-[80vw] h-screen flex-1 p-6 bg-[#213555] overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
