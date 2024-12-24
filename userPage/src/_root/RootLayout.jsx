import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import LeftNavbar from "../components/shared/LeftNavbar";
import { useAuth } from "../context/AuthContext";

const RootLayout = () => {
  const { isLoading: isDataLoading } = useAuth();
  const [isBrowserLoading, setIsBrowserLoading] = useState(true);

  // Detect when the browser finishes loading
  useEffect(() => {
    const handleBrowserLoad = () => setIsBrowserLoading(false);

    if (document.readyState === "complete") {
      handleBrowserLoad();
    } else {
      window.addEventListener("load", handleBrowserLoad);
    }

    return () => window.removeEventListener("load", handleBrowserLoad);
  }, []);

  const isLoading = isDataLoading || isBrowserLoading;

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen bg-gray-800 text-gray-200 flex flex-col items-center justify-between z-50 p-10">
        <img
          width={150}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          src="codecommLogo.svg"
          alt="codecomm-logo"
        />
        <div className="w-fit h-fit flex flex-col items-center justify-center mt-auto">
          <p>Form</p>
          <p className="text-xl font-semibold text-blue-400">CodeComm</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="w-[100vw] h-full lg:px-[10vw] md:px-[5rem] px-1 bg-black">
        {/* Show Navbar only on large screens and hide it on medium screens */}
        <div className="md:block hidden">
          <Navbar />
        </div>

        {/* Hide LeftNavbar on large screens, only show on medium screens */}
        <div className="md:hidden lg:hidden block">
          <LeftNavbar />
        </div>

        <section >
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default RootLayout;
