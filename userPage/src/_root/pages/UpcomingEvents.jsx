import React from "react";
import { Helmet } from "react-helmet";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UpcomingEvents = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Upcoming Events</title>
      </Helmet>
      <div className="w-full text-white">
        <header className="mb-10">
          <div className='w-fit h-fit flex items-center justify-center gap-2 border-b-4 border-indigo-500'>
            <img
              onClick={() => navigate('/')}
              width={40}
              src="/assets/arrow_back.svg"
              className='cursor-pointer'
              alt="arrowback" />
            <h1 className="text-4xl font-bold inline-block pb-2">
              Events
            </h1>
          </div>
          <nav className="mt-4 flex space-x-4">
            <NavLink
              to="/events/upcomming-events"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 font-semibold underline"
                  : "text-gray-300 hover:text-white"
              }
            >
              Live Events
            </NavLink>
            <NavLink
              to="/events/conducted-events"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 font-semibold underline"
                  : "text-gray-300 hover:text-white"
              }
            >
              Conducted Events
            </NavLink>
          </nav>
        </header>
        <section className="w-full h-full flex-wrap">
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default UpcomingEvents;
