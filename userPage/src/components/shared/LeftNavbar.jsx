import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOutUser } from "../../lib/appwrite/api";

const LeftNavbar = () => {
   const { user, isAuthenticated, isLoading } = useAuth();
   const [isOpen, setIsOpen] = useState(false);
   const [isSignOutLoading, setIsSignOutLoading] = useState(false);


   const toggleMenu = () => setIsOpen(!isOpen);

   const handleSignOut = async () => {
      setIsSignOutLoading(true);
      try {
         await signOutUser();
         setIsDropdownOpen(false);
         checkAuthUser();
      } catch (err) {
         console.error("Sign out failed", err);
      } finally {
         setIsSignOutLoading(false);
      }
   };

   return (
      <div className="w-full flex flex-col">
         {/* Hamburger button for small screens */}
         <button
            onClick={toggleMenu}
            className="w-12 h-12 text-white bg-black z-50 rounded-full md:hidden focus:outline-none transition-transform transform hover:scale-110"
            aria-label="Open Navigation Menu"
         >
            ☰
         </button>

         {/* Left Navbar (Sidebar) */}
         {isOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
               onClick={toggleMenu}
            >
               <div
                  className="fixed top-0 left-0 w-64 bg-[#131010] text-white p-6 flex flex-col space-y-8 mt-10"
                  onClick={(e) => e.stopPropagation()}
               >
                  {/* Logo */}
                  <div className="flex items-center gap-2 mb-8">
                     <img src="/codecommLogo.svg" alt="Logo" className="w-16" />
                     <p className="text-2xl font-semibold">CodeComm</p>
                  </div>

                  {/* Navigation Links */}
                  <nav className="space-y-4 flex flex-col">
                     <Link to="/" className="text-lg font-medium hover:text-gray-400 transition-all">Home</Link>
                     <Link to="/about" className="text-lg font-medium hover:text-gray-400 transition-all">About</Link>
                     <Link to="/events/upcomming-events" className="text-lg font-medium hover:text-gray-400 transition-all">Events</Link>
                  </nav>

                  {/* Profile Section */}
                  <div className="mt-auto">
                     {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                           <img
                              className="rounded-full"
                              width={40}
                              src={user.imageUrl}
                              alt={user.fullName || "Profile Picture"}
                           />
                           <div>
                              <p className="font-medium text-lg">{user.fullName}</p>
                              <button
                                 className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                                 onClick={handleSignOut}
                                 disabled={isSignOutLoading}
                              >
                                 {isSignOutLoading ? "Signing Out..." : "Sign Out"}
                              </button>
                           </div>
                        </div>
                     ) : isLoading ? (
                        <div className="text-center">
                           <p>Loading...</p>
                        </div>
                     ) : (
                        <Link className="text-lg font-medium hover:text-gray-400 transition-all" to="/sign-in">Sign In</Link>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default LeftNavbar;
