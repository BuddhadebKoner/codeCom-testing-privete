import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useActivateUser, useDeactivateUser, useUserById } from '../../../lib/react-query/queriesAndMutation';

const ManageProfiles = () => {
  const { id } = useParams();

  // Fetch user data by id
  const { data: user, isLoading: userLoading, isError } = useUserById(id, {
    refetchOnWindowFocus: true,
  });

  const { mutateAsync: deactivateUser, isLoading: deactivating } = useDeactivateUser();
  const { mutateAsync: activateUser, isLoading: activating } = useActivateUser();

  const [isActive, setIsActive] = useState(user?.isActive);


  // Handle Suspend/Unsuspend
  const handleSuspend = async () => {
    try {
      if (isActive) {
        await deactivateUser(user.$id);
      } else {
        await activateUser(user.$id);
      }
      setIsActive((prev) => !prev); // Toggle active state
    } catch (error) {
      console.error('Error toggling user active state:', error);
    }
  };

  const handleBan = (e) => {
    e.preventDefault();
    // Add logic for banning the user
    console.log('Ban user');
  };

  const handleRoleChange = (newRole) => {
    // Add logic for changing user role
    console.log(`Change role to ${newRole}`);
  };

  // Handle loading and error states
  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading user data.</div>;
  }

  console.log('User:', user);

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      {/* User Details Section */}
      <div className='w-fit h-fit flex gap-2'>
        <button
          className='text-xl font-bold flex gap-2'>
          <img
            onClick={(e) => {
              // prevent default
              e.preventDefault();
              navigate(-1)
            }}
            src="/assets/icons/arrow_back.svg"
            alt="arrow-back" />
        </button>
        <h1 className='text-xl'>User Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="w-full h-fit flex items-start gap-10">
        {/* Profile Image (dp) */}
        <div className="flex justify-center">
          <img
            src={user.imageUrl || 'https://via.placeholder.com/150'}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col justify-start space-y-2">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.role}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col justify-start space-y-2">
          {user.linkedin && (
            <a
              href={user.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-semibold"
            >
              LinkedIn
            </a>
          )}
          {user.x && (
            <a
              href={user.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-semibold"
            >
              X (Twitter)
            </a>
          )}
        </div>

        {/* Account Details */}
        <div className="flex flex-col justify-start space-y-2">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <p className="text-sm text-gray-400">
            <strong>Joined on:</strong> {new Date(user.$createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-400">
            <strong>Last updated:</strong> {new Date(user.$updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>




      {/* Admin Controls Section */}
      <div className="mt-6 p-6 border-t border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>

        <div className="flex items-center space-x-4">
          {/* Suspend/Unsuspend User */}
          <button
            onClick={handleSuspend}
            className={`py-2 px-4 rounded text-white ${isActive
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-green-500 hover:bg-green-600'
              }`}
            disabled={deactivating || activating}
          >
            {deactivating || activating ? 'Processing...' : isActive ? 'Suspend User' : 'Unsuspend User'}
          </button>

          {/* Ban User */}
          <button
            onClick={handleBan}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Ban User
          </button>
        </div>

        {/* Role Change Section */}
        <div className="mt-4">
          <label htmlFor="role" className="block text-sm font-semibold">Change Role</label>
          <select
            id="role"
            className="mt-2 p-2 border border-gray-300 rounded"
            defaultValue={user.role}
            onChange={(e) => handleRoleChange(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ManageProfiles;
