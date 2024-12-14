import React from "react";
import { Helmet } from "react-helmet";
import { NavLink, Outlet } from "react-router-dom";

const UpcomingEvents = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Upcoming Events</title>
      </Helmet>
      <div className="w-full max-w-7xl text-white">
        <header className="mb-10">
          <h1 className="text-4xl font-bold border-b-4 border-indigo-500 inline-block pb-2">
            Events
          </h1>

          <nav className="mt-4 flex space-x-4">
            <NavLink
              to="/events/upcomming-events"
              className={({ isActive }) =>
                isActive
                  ? "text-indigo-500 font-semibold underline"
                  : "text-gray-300 hover:text-white"
              }
            >
              Upcoming Events
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
