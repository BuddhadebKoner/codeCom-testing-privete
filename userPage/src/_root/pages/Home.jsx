import React from "react";
import { Link, useNavigate } from "react-router-dom";
import EventCard from "../../components/shared/EventCard";
import { useGetRecentEvents } from "../../lib/react-query/queriesAndMutation";
import Loader from "../../components/shared/Loader";

const Home = () => {
  // Using the custom hook from React Query
  const { data: events = [], isLoading, isError } = useGetRecentEvents();
  const navigate = useNavigate();
  console.log(events)

  // Shortlist up to three active events sorted by eventTime
  const shortlistedEvents = events
    .filter((event) => event.isActive) // Filter active events
    .sort((a, b) => new Date(a.eventTime) - new Date(b.eventTime)) // Sort by eventTime
    .slice(0, 3); // Take the first 3 events

  return (
    <div className="w-full flex flex-col pb-5">
      <img
        className="w-full lg:h-[350px] object-cover lg:rounded-3xl"
        src="/assets/event-default-banner.webp"
        alt="Event Banner"
      />
      <div className="flex flex-col py-8 gap-3">
        <h1 className="lg:text-3xl text-xl font-medium">Welcome to our Coding Club : CodeCom</h1>
        <a
          className="underline lg:text-xl text-sm w-fit"
          target="_blank"
          rel="noopener noreferrer"
          href="https://icampus.setgoi.ac.in/"
        >
          Sanaka Educational Trust's Group of Institutions, Malandighi, Durgapur
        </a>
        <h2 className="lg:text-xl text-sm">
          Join us to get to know your leads and mentors in person and form wonderful real-life connections!
        </h2>
      </div>

      {/* Upcoming events */}
      <div className="w-full">
        <div className="flex justify-between bg-[#D9D9D9] text-black px-6 lg:py-5 py-2 lg:rounded-xl">
          <h1>Upcoming Events</h1>
          <Link to="/upcoming-events">View all</Link>
        </div>

        {/* Display events */}
        <div className="w-full flex flex-wrap justify-around gap-6 mt-10">
          {isLoading && <Loader />}
          {isError && navigate('/not-found-page')}
          {shortlistedEvents.length > 0 ? (
            shortlistedEvents.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          ) : (
            !isLoading && <p>No upcoming events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
