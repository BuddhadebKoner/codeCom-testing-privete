import React from 'react'

const ToggleButton = ({ isToggled, onClick, isLoading, activeText, inactiveText }) => (
   <div className="flex flex-col items-center">
      <button
         onClick={onClick}
         disabled={isLoading}
         className={`relative flex items-center w-12 h-6 rounded-full transition-colors duration-300 ${isToggled ? "bg-green-400" : "bg-gray-400"
            } ${isLoading && "cursor-not-allowed opacity-50"}`}
      >
         <span
            className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${isToggled ? "translate-x-6" : "translate-x-1"
               }`}
         ></span>
      </button>
      <span className="mt-1 text-xs text-gray-300">{isToggled ? activeText : inactiveText}</span>
   </div>
);


export default ToggleButton