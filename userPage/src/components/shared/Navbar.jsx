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
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isSignOutLoading, setIsSignOutLoading] = useState(false);
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const dropdownRef = useRef(null);
   const navigate = useNavigate();

   const deBouncedValue = useDebounce(searchQuery, 1000);

   const { data: searchEvents, isFetching: isSearchFetching, isError: searchError } = useSearchEvents(deBouncedValue);
   const documents = searchEvents?.documents || [];

   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView && searchQuery && !isSearchFetching) {
         // Trigger pagination or fetch additional results
      }
   }, [inView, searchQuery, isSearchFetching]);

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

   useEffect(() => {
      const handleClickOutside = (e) => {
         if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
         }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, [isDropdownOpen]);

   const toggleSearch = () => {
      setIsSearchOpen((prev) => {
         document.body.style.overflow = prev ? "auto" : "hidden";
         return !prev;
      });
   };

   useEffect(() => {
      if (isSearchOpen || isDropdownOpen) {
         const handleKeyDown = (e) => {
            if (e.key === "Escape") {
               toggleSearch();
               setIsDropdownOpen(false);
            }
         };
         document.addEventListener("keydown", handleKeyDown);
         return () => document.removeEventListener("keydown", handleKeyDown);
      }
   }, [isSearchOpen, isDropdownOpen]);

   useEffect(() => {
      return () => {
         document.body.style.overflow = "auto";
      };
   }, []);

   const handleProfileClick = () => {
      setIsDropdownOpen(false);
      navigate(`/profile/${user.$id}`);
   };

   useEffect(() => {
      // GSAP Animations for Navbar
      gsap.fromTo(
         ".navbar-link",
         { opacity: 0, y: -20 },
         { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }
      );

      gsap.fromTo(
         ".navbar-logo",
         { opacity: 0, x: -20 },
         { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
         ".navbar-item",
         { opacity: 0, scale: 0.8 },
         { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
      );
   }, []);

   return (
      <nav className="bg-black text-white w-full flex justify-between items-center py-5 z-50">
         {isSearchOpen && (
            <>
               <Helmet>
                  <meta charSet="utf-8" />
                  <title>Search Events</title>
               </Helmet>
               <div
                  className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-start justify-center "
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
                     <input
                        type="text"
                        placeholder="Search by event title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-black"
                        aria-label="Search Events"
                     />
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

         <div className="navbar-logo lg:text-2xl font-normal no-select">
            <div className="flex w-fit h-fit justify-center items-center gap-2">
               <Link to="/">
                  <img
                     className="w-20 no-drag"
                     src="/codecommLogo.svg"
                     alt="CodeComm Logo"
                  />
               </Link>
               <p className="text-2xl font-semibold">CodeComm</p>
            </div>
         </div>
         <div className="flex gap-10">
            <div className="flex items-center gap-2 lg:gap-10">
               <Link className="navbar-link lg:text-xl text-sm" to="/about">About</Link>
               <Link className="navbar-link lg:text-xl text-sm" to="/events/upcomming-events">Events</Link>
               <button onClick={toggleSearch} aria-label="Open Search">
                  <img className="navbar-link" src="/assets/icons/search_icon.svg" alt="search-icon" />
               </button>
            </div>

            {isAuthenticated ? (
               <div className="relative flex items-center navbar-item">
                  <button
                     className="rounded-full"
                     onClick={() => setIsDropdownOpen((prev) => !prev)}
                     aria-label="Toggle Dropdown"
                     aria-expanded={isDropdownOpen}
                  >
                     <img
                        className="rounded-full"
                        width={40}
                        src={user.imageUrl}
                        alt={user.fullName || "Profile Picture"}
                     />
                  </button>
                  {isDropdownOpen && (
                     <div ref={dropdownRef} className="absolute top-10 right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-md z-50">
                        <Link
                           to={`/profile/${user.$id}`}
                           className="block px-4 py-2 text-sm hover:bg-gray-200"
                           onClick={handleProfileClick}
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
               <Link className="navbar-link lg:text-xl text-sm" to="/sign-in">Sign In</Link>
            )}
         </div>
      </nav>
   );
};

export default Navbar;