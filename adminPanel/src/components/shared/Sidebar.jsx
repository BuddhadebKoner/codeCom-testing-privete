import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sections } from '../../constant';
import { useAuth } from '../../context/AuthContext';
import { useSignOutUser } from '../../lib/react-query/queriesAndMutation';
import { toast } from 'react-toastify';
import BigLoader from './BigLoader';

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({});
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const { mutate: signOut, isPending, isSuccess, isError } = useSignOutUser();

  if (!isAuthenticated) {
    return null;
  }

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isPending) {
    return (
      <div className="fixed w-screen h-screen bg-gray-800 text-gray-200 flex items-center justify-center z-50">
        <BigLoader />
      </div>
    );
  }

  if (isError) {
    toast.error("Error signing out. Please try again.");
    navigate('/sign-in');
  }

  if (isSuccess) {
    toast.success("User signed out successfully");
    navigate('/sign-in');
  }


  return (
    <div className="h-screen w-[20vw] bg-gray-800 text-gray-200 overflow-y-auto overflow-x-hidden pb-20 ">
      {/* Header */}
      <div className="p-4 text-xl font-bold text-white">
        Admin Dashboard
      </div>

      {/* Navigation */}
      <nav className="space-y-4 px-4">
        <Link to="/" className="block hover:bg-gray-700 p-2 rounded transition-all">
          Home
        </Link>

        {sections.map((section, index) => (
          <div key={index}>
            <div
              onClick={() => toggleSection(section.title)}
              className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-700 rounded transition-all"
            >
              <span className='font-bold'>{section.title}</span>
              <span>
                {openSections[section.title] ? '⬆️' : '⬇️'}
              </span>
            </div>

            {openSections[section.title] && (
              <div className="ml-4 space-y-2">
                {section.links.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    className="block hover:bg-gray-700 p-2 rounded transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {
        isLoading ? (
          <div className="absolute bottom-0 w-full p-4 text-center">
            Loading...
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 w-[20vw] bg-gray-900 p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                width={30}
                height={30}
                className="rounded-full"
                src={user?.imageUrl}
                alt={user?.name || "User Avatar"}
              />
              <span className='font-bold'>{user?.name || "User"}</span>
            </div>
            <button
              onClick={signOut}
              className="p-2 rounded hover:bg-gray-700 transition-all">
              <img
                src="/assets/icons/logout.svg"
                alt="logout" />
            </button>
          </div>
        )
      }
    </div>
  );
};

export default Sidebar;
