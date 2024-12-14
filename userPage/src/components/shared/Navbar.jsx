import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { signOutUser } from "../../lib/appwrite/api";
import { useGetRecentEvents, useSearchEvents } from "../../lib/react-query/queriesAndMutation";
import { useInView } from "react-intersection-observer";
import useDebounce from "../../hooks/useDbounce";
import Loader from "./Loader";
import SearchEventcard from "./SearchEventcard";
import { Helmet } from "react-helmet";

const Navbar = () => {
   const { user, isAuthenticated, isLoading, checkAuthUser } = useAuth();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isSignOutLoading, setIsSignOutLoading] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate();

   const deBouncedValue = useDebounce(searchQuery, 1000);
   const { data: searchEvents, isFetching: isSearchFetching, isError: searchError } = useSearchEvents(deBouncedValue);
   const documents = searchEvents?.documents || [];

   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView && !searchQuery) {
         // Implement pagination if needed.
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
   if (isSearchOpen) {
      // then i press the esc key in keybord
      document.addEventListener("keydown", (e) => {
         if (e.key === "Escape") {
            toggleSearch();
         }
      });
   }

   return (
      <nav className="bg-black text-white w-full flex justify-between items-center py-5">
         {/* Search Overlay */}
         {isSearchOpen && (
            <>
               <Helmet>
                  <meta charSet="utf-8" />
                  <title>Search Events</title>
               </Helmet>
               <div
                  className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center z-50"
                  onClick={toggleSearch}
               >
                  <div
                     className="w-full max-w-4xl mt-20 bg-black rounded-lg shadow-lg p-6 relative overflow-hidden border-2 border-white"
                     onClick={(e) => e.stopPropagation()}
                  >
                     <button className="w-fit h-fit bg-white text-black m-2 px-2 rounded-sm"
                        onClick={toggleSearch}
                     >
                        Esc
                     </button>
                     {/* Search Input */}
                     <input
                        type="text"
                        placeholder="Search by event title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        aria-label="Search Events"
                     />

                     {/* Results Section */}
                     <div className="overflow-y-auto max-h-[60vh]">
                        {isSearchFetching ? (
                           <div className="text-center text-gray-500">Searching...</div>
                        ) : documents.length > 0 ? (
                           documents.map((doc, index) => (
                              <SearchEventcard key={index} event={doc} toggleSearch={toggleSearch} />
                           ))
                        ) : (
                           <div className="flex flex-col items-center justify-center space-y-4 text-gray-500">
                              <h2>No results found.</h2>
                              <p>Try a different search term or browse recent events.</p>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            </>
         )}

         <Link className="lg:text-2xl font-normal" to={"/"}>
            <div className="flex w-fit h-fit justify-center items-center">
               <img
                  className="w-20"
                  src="/codecommLogo.svg" alt="" />
               <p>CodeComm</p>
            </div>
         </Link>
         <div className="flex gap-10">
            <div className="flex items-center gap-2 lg:gap-10">
               <Link className="lg:text-xl text-sm" to={"/about"}>About</Link>
               <Link className="lg:text-xl text-sm" to={"/events/upcomming-events"}>Events</Link>
               <button onClick={toggleSearch} aria-label="Open Search">
                  <img src="/assets/icons/search_icon.svg" alt="search-icon" />
               </button>
            </div>
            {/* Profile Section */}
            {isAuthenticated ? (
               <div className="relative flex items-center">
                  <button
                     className="rounded-full"
                     onClick={() => setIsDropdownOpen((prev) => !prev)}
                     aria-label="Toggle Dropdown"
                  >
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
               <img width={40} src="/loader.svg" alt="Loading" />
            ) : (
               <Link className="lg:text-xl text-sm" to={"/sign-in"}>Sign In</Link>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
