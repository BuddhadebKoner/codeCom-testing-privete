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
      <div className="fixed w-screen h-full bg-gray-800 text-gray-200 flex items-center justify-center z-50">
        <BigLoader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.pages.map((page) =>
          page?.documents.map((event) => (
            <EventCard key={event.eventId} event={event} />
          ))
        )}
      </div>
      {hasNextPage && (
        <div ref={ref} className="flex justify-center mt-8 text-gray-400">
          Loading more events...
        </div>
      )}
    </div>
  );
};

export default UpcommingEvents;
