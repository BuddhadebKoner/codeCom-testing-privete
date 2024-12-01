import React from "react";
import { useOutletContext } from "react-router-dom";

const ProfileInfo = () => {
   const { userInfo } = useOutletContext();
   console.log(userInfo);

   return (
      <div className="organized-events w-full p-4 bg-gray-800 text-white rounded-lg space-y-8">
         <h2 className="text-2xl font-bold mb-4">About Me</h2>
         <p
            className="p-4 border border-gray-600 rounded-lg flex justify-between items-start"
         >{userInfo.aboutMe}</p>
      </div>
   );
};

export default ProfileInfo;
