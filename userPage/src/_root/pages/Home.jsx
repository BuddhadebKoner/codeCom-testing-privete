import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventCard from "../../components/shared/EventCard";
import { useGetRecentEvents } from "../../lib/react-query/queriesAndMutation";
import Loader from "../../components/shared/Loader";
import { Helmet } from "react-helmet";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const { data: events = [], isLoading, isError } = useGetRecentEvents();
  const navigate = useNavigate();

  const shortlistedEvents = events
    .filter((event) => event.isActive)
    .sort((a, b) => new Date(a.eventTime) - new Date(b.eventTime))
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <div className="w-full flex flex-col pb-5 text-white lg:px-[2vw] md:px-[1rem] z-0">
        {/* Swiper Banner Section */}
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          slidesPerView={1}
          className="w-full h-fit object-cover lg:rounded-2xl"

        >
          <SwiperSlide>
            <img
              className="w-full lg:h-[350px] object-cover lg:rounded-2xl md:rounded-xl"
              src="/assets/event-default-banner.webp"
              alt="Event Banner 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full lg:h-[350px] object-cover lg:rounded-2xl"
              src="/assets/event-default-banner.webp"
              alt="Event Banner 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-full lg:h-[350px] object-cover lg:rounded-2xl"
              src="/assets/event-default-banner.webp"
              alt="Event Banner 3"
            />
          </SwiperSlide>
        </Swiper>

        <div className="flex flex-col py-8 gap-3">
          {/* Welcome Text with subtle fade-in animation */}
          <h1 className="fade-text lg:text-3xl text-xl font-medium">
            Welcome to our Coding Club : CodeComm
          </h1>
          <a
            className="underline lg:text-xl text-sm w-fit fade-text"
            target="_blank"
            rel="noopener noreferrer"
            href="https://icampus.setgoi.ac.in"
          >
            Sanaka Educational Trust's Group of Institutions, Malandighi, Durgapur
          </a>
          <h2 className="lg:text-xl text-sm fade-text">
            Join us to get to know your leads and mentors in person and form wonderful real-life connections!
          </h2>
        </div>

        {/* Upcoming Events Section */}
        <div className="w-full event-section">
          <div className="flex justify-between bg-[#D9D9D9] text-black px-6 lg:py-5 py-2 lg:rounded-xl fade-text">
            <h1>Upcoming Events</h1>
            <Link to="/events/upcomming-events">View all</Link>
          </div>

          {/* Display events */}
          <div className="w-full flex flex-wrap justify-around gap-6 mt-10">
            {isLoading && <Loader />}
            {isError && navigate('/not-found-page')}
            {shortlistedEvents.length > 0 ? (
              shortlistedEvents.map((event, index) => (
                <div className="fade-text">
                  <EventCard key={index} event={event} />
                </div>
              ))
            ) : (
              !isLoading && (
                <div className="w-full min-h-[20rem] flex justify-center items-center fade-text">
                  <p>No upcoming events available.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;