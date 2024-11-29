import React from "react";
import { useOutletContext } from "react-router-dom";

const ProfileInfo = () => {
   const { userInfo } = useOutletContext();
   console.log(userInfo);

   return (
      <div>
         <h2>Profile Info</h2>
         <p>Name: {userInfo?.name}</p>
         <p>Email: {userInfo?.email}</p>
      </div>
   );
};

export default ProfileInfo;
