import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { signOutUser } from "../lib/appwrite/api";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();

  const handleSignOut = async () => {
    await signOutUser();
    console.log("User signed out successfully");
    navigate("/sign-in");
  };

  useEffect(() => {
    const checkUserAccess = async () => {
      if (!isLoading) {
        if (isAuthenticated) {
          if (user?.isAdmin) {
            console.log("User is admin:", user);
          } else {
            console.log("User is not admin, signing out...");
            await handleSignOut();
          }
        } else {
          navigate("/sign-in");
        }
      }
    };

    checkUserAccess();
  }, [isAuthenticated, isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      ) : (
        isAuthenticated && (
          <>
            <Navbar />
            <section>
              <Outlet />
            </section>
          </>
        )
      )}
    </>
  );
};

export default RootLayout;
