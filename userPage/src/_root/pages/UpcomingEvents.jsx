import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetUpcommingEvents } from "../../lib/react-query/queriesAndMutation";

const UpcomingEvents = () => {
  const { data: events, fetchNextPage, hasNextPage } = useGetUpcommingEvents();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events?.pages.map((page, pageIndex) =>
          page?.documents.map((event) => (
            <div
              key={event.eventId}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                {event.subtitle}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {new Date(event.eventTime).toLocaleString()} | {event.city}
              </p>
              <a
                href={event.locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Location
              </a>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Organized by: {event.organizers[0]?.name}
              </p>
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <div ref={ref} className="flex justify-center mt-8">
          loading more events...
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
