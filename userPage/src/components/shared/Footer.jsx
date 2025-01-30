// Footer.jsx
import React from 'react';

const Footer = () => {
   return (
      <footer className="w-full  py-6 text-white text-center flex flex-col items-center mt-20 ">
         <div className="max-w-6xl w-full px-4">
            <p className="text-sm mb-2">
               &copy; {new Date().getFullYear()} CodeComm. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
               Designed with ❤️ by CodeComm Team
            </p>
         </div>
      </footer>
   );
};

export default Footer;