import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { signOutUser } from "../../lib/appwrite/api";

const Navbar = () => {
   const { user, isAuthenticated, isLoading } = useAuth();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isSignOutLoading, setIsSignOutLoading] = useState(false);

   // Toggle dropdown visibility
   const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
   };

   // Handle sign-out
   const handleSignOut = async () => {
      setIsSignOutLoading(true);
      try {
         // Call signOutUser mutation
         await signOutUser();
         setIsDropdownOpen(false);
         // Reload the page after successful sign-out
         window.location.reload();
      } catch (err) {
         console.error("Sign out failed", err);
      } finally {
         setIsSignOutLoading(false);
      }
   };

   return (
      <nav className="bg-black text-white w-full flex justify-between items-center py-5 px-4 border-b-2 border-[#D9D9D9]">
         <Link className="lg:text-2xl font-normal" to={"/"}>&lt;/&gt; CodeCom</Link>
         <div className="flex justify-center items-center lg:gap-10 gap-2">
            <Link className="lg:text-xl text-sm" to={"/about"}>About</Link>
            <Link className="lg:text-xl text-sm" to={"/upcoming-events"}>Events</Link>

            {/* Profile Section */}
            {isAuthenticated ? (
               <div className="relative">
                  <button
                     className="rounded-full"
                     onClick={toggleDropdown}
                     disabled={isSignOutLoading}
                  >
                     <img
                        className="rounded-full"
                        width={40}
                        src={user.imageUrl}
                        alt={user.fullName || "Profile Picture"}  // Improved alt text
                     />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                     <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md">
                        <Link
                           to={`/profile/${user.userId}`}  // Fixed the profile URL
                           className="block px-4 py-2 text-sm hover:bg-gray-200"
                           onClick={() => setIsDropdownOpen(false)}
                        >
                           Profile
                        </Link>
                        <button
                           className="w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                           onClick={handleSignOut}
                           disabled={isSignOutLoading}
                        >
                           {isSignOutLoading ? "Signing Out..." : "Sign Out"}
                        </button>
                     </div>
                  )}
               </div>
            ) : isLoading ? (
               <img width={40} src="/loader.svg" alt="loader" />
            ) : (
               <Link className="lg:text-xl text-sm" to={"/sign-in"}>Sign In</Link>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
