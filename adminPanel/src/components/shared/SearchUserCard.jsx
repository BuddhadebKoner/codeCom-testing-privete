import React from 'react';
import { Link } from 'react-router-dom';

const SearchUserCard = ({ user }) => {
   // console.log(user);
   return (
      <Link
         to={`/users/manage-profiles/${user.$id}`}
         className="border p-4 mb-4 rounded-lg shadow-lg">
         <div className="flex items-center space-x-4">
            {/* User Image (Profile Picture) */}
            <div>
               <img
                  src={user.imageUrl || 'https://via.placeholder.com/150'} // Fallback to placeholder if no image
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
               />
            </div>

            {/* User Name and Role */}
            <div className="flex-1">
               <h3 className="text-lg font-semibold">{user.name}</h3>
               <p className="text-sm text-gray-500">{user.role}</p>
            </div>
         </div>
      </Link>
   );
};

export default SearchUserCard;
