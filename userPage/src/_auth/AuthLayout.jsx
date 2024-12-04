import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BigLoader from "../components/shared/BigLoader";

const AuthLayout = () => {
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 1279);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   return (
      <div className="w-[100vw] h-full flex lg:px-0 md:px-0 px-0 bg-primary-100">
         {/* Left Section */}
         <div className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat bg-black">
            {/* Conditionally render for non-mobile */}
            {!isMobile && (
               <Suspense fallback={<BigLoader />}>
                  <img
                     className="h-full w-full object-cover"
                     src="abstract-image.webp"
                     alt="Abstract Art"
                  />
               </Suspense>
            )}
         </div>

         {/* Right Section */}
         <section className="flex flex-1 flex-col justify-center items-center bg-primary-100 py-10 px-5 lg:px-20 md:px-10 rounded-md">
            <Outlet />
         </section>
      </div>
   );
};

export default AuthLayout;
