import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";

const authContext = createContext();

// In AuthProvider component
export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   const navigate = useNavigate();

   const checkAuthUser = async () => {
      try {
         const currentUser = await getCurrentUser();

         if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
            if (currentUser.isAdmin) {
               navigate("/");
            } else {
               navigate("/sign-in");
            }
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
            isAuthenticated,
            isLoading,
            checkAuthUser,
         }}
      >
         {children}
      </authContext.Provider>
   );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(authContext);
