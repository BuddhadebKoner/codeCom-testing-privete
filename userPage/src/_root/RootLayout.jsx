import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/shared/Footer";

const RootLayout = () => {
  const { isLoading: isDataLoading } = useAuth();
  const [isBrowserLoading, setIsBrowserLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    document.body.style.overflow = isOnline ? "auto" : "hidden";

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.body.style.overflow = "auto";
    };
  }, [isOnline]);


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
          <p>Loading...</p>
          <p className="text-xl font-semibold text-blue-400">CodeComm</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!isOnline && (
        <div className="fixed w-full h-screen bg-gray-900 bg-opacity-75 z-50 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-white mb-5">You are Offline</p>
          <p className="text-white">Please check your internet connection.</p>
        </div>
      )}

      <main
        className={` w-[100vw] h-full lg:px-[10vw] md:px-[5rem] px-1 bg-black ${!isOnline ? "pointer-events-none" : ""
          }`}
      >
        {/* Show Navbar */}
        <Navbar />
        <section>
          <Outlet />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default RootLayout;
