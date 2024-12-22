import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetUpcommingEvents } from "../../../lib/react-query/queriesAndMutation";
import BigLoader from "../../../../../userPage/src/components/shared/BigLoader";
import EventCard from "../../../components/shared/EventCard";

const UpcommingEvents = () => {
  const { data: events, fetchNextPage, hasNextPage, isFetching: isLoading } = useGetUpcommingEvents();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (isLoading && !events) {
    return (
      <div className="fixed text-gray-200 flex items-center justify-center z-50">
        <BigLoader />
      </div>
    );
  }

  const isEmpty = events?.pages.every((page) => page?.documents.length === 0);

  return (
    <div className="p-6">
      {isEmpty ? (
        <div className="text-center text-gray-400 mt-8">
          <p>No upcoming events available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events?.pages.map((page) =>
            page?.documents.map((event) => (
              <EventCard key={event.eventId} event={event} />
            ))
          )}
        </div>
      )}
      {hasNextPage && !isEmpty && (
        <div ref={ref} className="flex justify-center mt-8 text-gray-400">
          Loading more events...
        </div>
      )}
    </div>
  );
};

export default UpcommingEvents;
