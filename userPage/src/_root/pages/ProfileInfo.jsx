import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
   const { userInfo } = useOutletContext();
   const { user } = useAuth();

   // Check if the logged-in user is the same as the profile being viewed
   const isOwnProfile = user?.$id === userInfo.$id;

   return (
      <div className="w-full p-4 bg-gray-800 text-white rounded-lg space-y-8">
         <h2 className="text-2xl font-bold mb-4">About Me</h2>

         {userInfo.aboutMe ? (
            // If 'aboutMe' exists, show it
            <p className="p-4 border border-gray-600 rounded-lg">
               {userInfo.aboutMe}
            </p>
         ) : (
            // If 'aboutMe' is empty, show a message or an edit option
            <div className="flex items-center border border-gray-600 rounded-lg p-4 font-normal">
               <h1 className="text-xl">No about me section available</h1>
               {isOwnProfile && (
                  <Link to={`/profile/${userInfo.$id}/edit`}>
                     <p className="text-blue-500 px-4 py-2 rounded-lg text-xl">
                        Add About Section
                     </p>
                  </Link>
               )}
            </div>
         )}
      </div>
   );
};

export default ProfileInfo;
