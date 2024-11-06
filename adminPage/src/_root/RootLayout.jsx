import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        if (user?.isAdmin) {
          console.log("User is admin:");
        } else {
          console.log("User is not admin, redirecting to sign-in");
          navigate("/sign-in");
        }
      } else {
        navigate("/sign-in");
      }
    }
  }, [isAuthenticated, isLoading, navigate, user]);

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
