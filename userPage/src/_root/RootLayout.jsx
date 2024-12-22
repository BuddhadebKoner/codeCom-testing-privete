import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import LeftNavbar from "../components/shared/LeftNavbar";

const RootLayout = () => {
  return (
    <>
      <main className="w-[100vw] lg:px-[15vw] md:px-[5rem] px-1">
        {/* Show Navbar only on large screens and hide it on medium screens */}
        <div className="md:block hidden">
          <Navbar />
        </div>

        {/* Hide LeftNavbar on large screens, only show on medium screens */}
        <div className="md:hidden lg:hidden block">
          <LeftNavbar />
        </div>

        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default RootLayout;
