import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { signOutUser } from "../../lib/appwrite/api";
import { useSearchEvents } from "../../lib/react-query/queriesAndMutation";
import { useInView } from "react-intersection-observer";
import useDebounce from "../../hooks/useDbounce";

const Navbar = () => {
   const { user, isAuthenticated, isLoading, checkAuthUser } = useAuth();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isSignOutLoading, setIsSignOutLoading] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");

   // Debounce the search query to optimize API calls
   const deBouncedValue = useDebounce(searchQuery, 1000);

   // Fetch search results
   const { data: searchEvents, isFetching: isSearchFetching } = useSearchEvents(deBouncedValue);
   const documents = searchEvents?.documents || [];

   // Infinite scrolling
   const { ref, inView } = useInView();
   useEffect(() => {
      if (inView && !searchQuery) {
         // Add pagination fetching logic if needed
      }
   }, [inView, searchQuery]);

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

   const toggleSearch = () => {
      setIsSearchOpen((prev) => !prev);
      document.body.style.overflow = isSearchOpen ? "auto" : "hidden";
   };

   return (
      <nav className="bg-black text-white w-full flex justify-between items-center py-5 px-4">
         {/* Search Overlay */}
         {isSearchOpen && (
            <div
               className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center z-50"
               onClick={toggleSearch}
            >
               <div
                  className="w-full max-w-md bg-white text-black rounded-lg shadow-lg mt-10"
                  onClick={(e) => e.stopPropagation()}
               >
                  <input
                     type="text"
                     placeholder="Search..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full px-4 py-2 border-b border-gray-300 outline-none"
                  />
                  <ul className="max-h-48 overflow-y-auto">
                     {isSearchFetching ? (
                        <li className="px-4 py-2 text-gray-500">Searching...</li>
                     ) : documents.length > 0 ? (
                        documents.map((doc, index) => (
                           <li key={index} className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                              {doc.title} {/* Adjust based on your API response */}
                           </li>
                        ))
                     ) : (
                        <li className="px-4 py-2 text-gray-500">No results found</li>
                     )}
                  </ul>
               </div>
            </div>
         )}
         <Link className="lg:text-2xl font-normal" to={"/"}>&lt;/&gt; CodeComm</Link>
         <div className="flex gap-10">
            <div className="flex justify-center items-center lg:gap-10 gap-2">
               <Link className="lg:text-xl text-sm" to={"/about"}>About</Link>
               <Link className="lg:text-xl text-sm" to={"/upcoming-events"}>Events</Link>
               <button onClick={toggleSearch}>
                  <img src="/assets/icons/search_icon.svg" alt="search-icon" />
               </button>
            </div>
            {/* Profile Section */}
            {isAuthenticated ? (
               <div className="relative flex items-center justify-center">
                  <button className="rounded-full" onClick={() => setIsDropdownOpen((prev) => !prev)}>
                     <img
                        className="rounded-full"
                        width={40}
                        src={user.imageUrl}
                        alt={user.fullName || "Profile Picture"}
                     />
                  </button>
                  {isDropdownOpen && (
                     <div className="absolute top-10 right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md z-50">
                        <Link
                           to={`/profile/${user.$id}`}
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
