import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetUpcommingEvents } from "../../lib/react-query/queriesAndMutation";
import UpcommingEventCards from "../../components/shared/UpcommingEventCards";

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
            <UpcommingEventCards key={event.$id} event={event} />
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
