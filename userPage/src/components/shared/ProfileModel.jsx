import React from "react";

const ProfileModel = ({ imageUrl, onClose }) => {
   // desable scroll and scrollbar
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative">
        <img
          src={imageUrl}
          alt="Full-size profile"
          className="w-[500px] h-[500px] rounded-lg"   
        />
      </div>
    </div>
  );
};

export default ProfileModel;

