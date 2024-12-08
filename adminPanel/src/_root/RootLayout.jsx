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

  if (isLoading) {
    return (
      <div className="fixed w-screen h-fit bg-gray-800 text-gray-200 flex items-center justify-center z-50">
        <BigLoader />
      </div>
    );
  }


  return (
    <>
      {
        isLoading ? (
          <div className='w-screen h-screen overflow-hidden flex justify-center items-center z-50'>
            <BigLoader />
          </div>
        ) : (
          <div className="flex relative">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="w-[80vw] h-screen flex-1 p-6 bg-gray-100 overflow-auto">
              <Outlet />
            </div>
          </div>
        )
      }

    </>
  );
};

export default RootLayout;
