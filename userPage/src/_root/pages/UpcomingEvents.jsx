import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetUpcommingEvents } from "../../lib/react-query/queriesAndMutation";
import UpcommingEventCards from "../../components/shared/UpcommingEventCards";
import BigLoader from "../../components/shared/BigLoader";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const UpcomingEvents = () => {
  const { data: events, fetchNextPage, hasNextPage, isFetching: isLoading } = useGetUpcommingEvents();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Upcomming Events</title>
      </Helmet>
      <div className="w-full max-w-7xl text-white">
        <header className="mb-10">
          <h1 className="text-4xl font-bold border-b-4 border-indigo-500 inline-block pb-2">
            Upcomming Events
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
            Welcome to CodeComm, where innovation meets collaboration. Explore our mission, vision, and core values.
          </p>
        </header>
        {
          isLoading && !events ? (
            <>
              <div className="w-full h-fit flex justify-center items-center">
                <BigLoader />
              </div>
            </>
          ) : (
            <>
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
            </>
          )
        }
      </div>
    </>
  );
};

export default UpcomingEvents;
