import React from 'react';
import Sidebar from '../components/shared/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BigLoader from '../components/shared/BigLoader';

const RootLayout = () => {

  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/sign-in');
  }


  return (
    <>
      {
        isLoading ? (
          <div className='w-screen h-screen overflow-hidden flex justify-center items-center'>
            <BigLoader />
          </div>
        ) : (
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="w-screen h-screen flex-1 p-6 bg-gray-100">
              <Outlet />
            </div>
          </div>
        )
      }

    </>
  );
};

export default RootLayout;
