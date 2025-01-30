import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { signOutUser } from "../../lib/appwrite/api";
import { useSearchEvents } from "../../lib/react-query/queriesAndMutation";
import { useInView } from "react-intersection-observer";
import useDebounce from "../../hooks/useDbounce";
import SearchEventcard from "./SearchEventcard";
import { Helmet } from "react-helmet";
import gsap from "gsap";

const Navbar = () => {
   const { user, isAuthenticated, isLoading, checkAuthUser } = useAuth();
   const [isSignOutLoading, setIsSignOutLoading] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const dropdownRef = useRef(null);
   const navigate = useNavigate();

   const deBouncedValue = useDebounce(searchQuery, 1000);

   const { data: searchEvents, isFetching: isSearchFetching } = useSearchEvents(deBouncedValue);
   const documents = searchEvents?.documents || [];

   const { ref, inView } = useInView();


   const handleSignOut = async () => {
      setIsSignOutLoading(true);
      try {
         await signOutUser();
         checkAuthUser();
      } catch (err) {
         console.error("Sign out failed", err);
      } finally {
         setIsSignOutLoading(false);
      }
   };

   const toggleSearch = () => {
      setIsSearchOpen((prev) => {
         document.body.style.overflow = prev ? "auto" : "hidden";
         return !prev;
      });
   };

   const handleProfileClick = () => {
      navigate(`/profile/${user.$id}`);
   };

   useEffect(() => {
      gsap.fromTo(
         ".navbar-item",
         { opacity: 0, y: -10 },
         { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
   }, []);

   return (
      <nav className="text-white w-full flex justify-between items-center py-4 px-1 lg:px-10 z-50 relative">
         {isSearchOpen && (
            <>
               <Helmet>
                  <meta charSet="utf-8" />
                  <title>Search Events</title>
               </Helmet>
               <div
                  className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-40"
                  onClick={toggleSearch}
               >
                  <div
                     className="w-full max-w-4xl bg-gray-800 text-gray-100 rounded-lg shadow-lg p-6 relative z-50"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <button
                        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full px-2 py-1 transition duration-200"
                        onClick={toggleSearch}
                     >
                        Close
                     </button>
                     <input
                        type="text"
                        placeholder="Search by event title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-gray-100 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                     />
                     <div className="mt-4 max-h-[60vh] overflow-y-auto">
                        {isSearchFetching ? (
                           <p className="text-center text-gray-400">Searching...</p>
                        ) : documents.length > 0 ? (
                           documents.map((doc, index) => (
                              <SearchEventcard key={index} event={doc} toggleSearch={toggleSearch} />
                           ))
                        ) : (
                           <p className="text-center text-gray-400">No results found.</p>
                        )}
                     </div>
                  </div>
               </div>
            </>
         )}


         <div className="navbar-item">
            <Link to="/" className="flex items-center gap-5 group relative">
               <img
                  src="/codecommLogo.svg"
                  alt="CodeComm"
                  className="w-16 hidden lg:block"
               />
               <div className="text-xl font-bold relative overflow-hidden px-2">
                  <div className="absolute inset-0 bg-[#FF7A00] rounded-lg translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
                  <span className="relative z-10">CodeComm</span>
               </div>
            </Link>
         </div>


         <div className="flex items-center space-x-6">
            <Link
               className="hidden lg:block text-lg font-semibold relative group overflow-hidden px-2"
               to="/about"
            >
               <div className="absolute inset-0 bg-[#FF7A00] rounded-lg translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
               <span className="relative z-10">About</span>
            </Link>
            <Link
               className="hidden lg:block text-lg font-semibold relative group overflow-hidden px-2"
               to="/events/upcomming-events"
            >
               <div className="absolute inset-0 bg-[#FF7A00] rounded-lg translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
               <span className="relative z-10">Events</span>
            </Link>
            <Link
               className="hidden lg:block text-lg font-semibold relative group overflow-hidden px-2"
               to="/resume-builder"
            >
               <div className="absolute inset-0 bg-[#FF7A00] rounded-lg translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
               <span className="relative z-10">Resume Builder</span>
            </Link>

            <button onClick={toggleSearch} aria-label="Search">
               <img src="/assets/icons/search_icon.svg" alt="Search" className="w-6 h-6" />
            </button>

            {isAuthenticated ? (
               <div className="relative">
                  <Link
                     to={'/learn'}
                     className="rounded-full focus:outline-none"
                  >
                     <img
                        src={user.imageUrl}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                     />
                  </Link>
               </div>
            ) : (
               isLoading ? (
                  <img src="/loader.svg" alt="Loading" className="w-6 h-6" />
               ) : (
                  <Link className="text-sm font-medium" to="/sign-in">
                     <img
                        src="/assets/icons/account_none.svg"
                        alt="account"
                        className="w-10 h-10 rounded-full"
                     />
                  </Link>
               )
            )}
         </div>
      </nav>
   );
};

export default Navbar;
