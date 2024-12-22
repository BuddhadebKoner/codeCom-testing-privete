import React from "react";

const ImagePopup = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg">
        <button
          onClick={onClose}
          className="w-fit h-fit absolute top-3 right-3 text-white bg-black rounded-full p-2 hover:bg-gray-800"
        >
          ✕
        </button>
        <img
          src={imageUrl}
          alt="Zoomed Event"
          className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImagePopup;
