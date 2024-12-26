import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOutUser } from "../../lib/appwrite/api";
import { toast } from "react-toastify";

const LeftNavbar = () => {
   const { user, isAuthenticated, isLoading, checkAuthUser } = useAuth();
   const [isSignOutLoading, setIsSignOutLoading] = useState(false);

   const handleSignOut = async () => {
      setIsSignOutLoading(true);
      try {
         const res = await signOutUser();
         if (res) {
            checkAuthUser();
            toast.success("Sign out successful");
         }
      } catch (err) {
         console.error("Sign out failed", err);
         toast.error("Sign out failed");
      } finally {
         setIsSignOutLoading(false);
      }
   };

   return (
      <div className="w-full h-fit text-gray-800 dark:text-gray-200 pb-10 flex">
         <div className="w-full bg-[#1a1a1a] text-white p-6 flex flex-col space-y-8">

            {/* Navigation Links */}
            <nav className="space-y-6 flex flex-col">
               <Link to={`/profile/${user?.$id}`} className="text-lg font-medium hover:text-gray-400 transition-all">Profile</Link>
               <Link to="/about" className="text-lg font-medium hover:text-gray-400 transition-all">About</Link>
               <Link to="/events/upcoming-events" className="text-lg font-medium hover:text-gray-400 transition-all">Events</Link>
               <Link to="/terms" className="text-lg font-medium hover:text-gray-400 transition-all">Terms </Link>
               <Link to="/membership" className="text-lg font-medium hover:text-gray-400 transition-all">Membership</Link>
               <Link to="/contact" className="text-lg font-medium hover:text-gray-400 transition-all">Contact</Link>
               <Link to="/event-calender" className="text-lg font-medium hover:text-gray-400 transition-all">Calendar</Link>
            </nav>

            {/* Profile Section */}
            <div className="mt-auto">
               {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                     <img
                        className="rounded-full border-2 border-gray-600"
                        width={45}
                        src={user.imageUrl}
                        alt={user.fullName || "Profile Picture"}
                     />
                     <div>
                        <p className="font-medium text-lg text-gray-200">{user.fullName}</p>
                        <button
                           className="w-full text-left px-4 py-2 mt-3 text-sm bg-gray-700 hover:bg-gray-600 rounded-md"
                           onClick={handleSignOut}
                           disabled={isSignOutLoading}
                        >
                           {isSignOutLoading ? "Signing Out..." : "Sign Out"}
                        </button>
                     </div>
                  </div>
               ) : isLoading ? (
                  <div className="text-center text-gray-400">
                     <p>Loading...</p>
                  </div>
               ) : (
                  <Link className="text-lg font-medium text-gray-400 hover:text-gray-300 transition-all" to="/sign-in">Sign In</Link>
               )}
            </div>
         </div>
      </div>
   );
};

export default LeftNavbar;