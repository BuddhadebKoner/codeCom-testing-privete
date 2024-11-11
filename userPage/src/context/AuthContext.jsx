import { createContext, useContext, useState } from "react";
import { getCurrentUser } from "../lib/appwrite/api";
import { useEffect } from "react";

const authContext = createContext();


export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [isLoading, setIsLoading] = useState(true);


   // Function to check if the user is authenticated
   const checkAuthUser = async () => {
      try {
         const currentUser = await getCurrentUser();
         // console.log(currentUser);
         setIsAuthenticated(false);
         if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
         } else {
            setUser(null);
            setIsAuthenticated(false);
         }
      } catch (error) {
         console.error("Error checking user authentication:", error);
         setUser(null);
         setIsAuthenticated(false);
      } finally {
         setIsLoading(false);
      }
   };


   useEffect(() => {
      checkAuthUser();
   }, []);


   return (
      <authContext.Provider
         value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            isLoading
         }}>
         {children}
      </authContext.Provider>
   );
};


// custom hook
export const useAuth = () => useContext(authContext);