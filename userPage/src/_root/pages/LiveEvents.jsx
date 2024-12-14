import React, { useEffect } from 'react'
import { useGetUpcommingEvents } from '../../lib/react-query/queriesAndMutation';
import { useInView } from 'react-intersection-observer';
import BigLoader from '../../components/shared/BigLoader';
import UpcommingEventCards from '../../components/shared/UpcommingEventCards';



const LiveEvents = () => {
   const { data: events, fetchNextPage, hasNextPage, isFetching: isLoading } = useGetUpcommingEvents();
   const { ref, inView } = useInView();

   useEffect(() => {
      if (inView && hasNextPage) {
         fetchNextPage();
      }
   }, [inView, hasNextPage]);

   return (
      <>
         {isLoading ? (
            <div className="w-full h-fit flex justify-center items-center">
               <BigLoader />
            </div>
         ) : (
            <>
               {events?.pages?.length > 0 && events.pages.some(page => page?.documents?.length > 0) ? (
                  <>
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4">
                        {events.pages.map((page) =>
                           page.documents.map((event) => (
                              <UpcommingEventCards key={event.$id} event={event} />
                           ))
                        )}
                     </div>
                     {hasNextPage && (
                        <div ref={ref} className="flex justify-center mt-8">
                           <p className="text-base text-gray-500">Loading more events...</p>
                        </div>
                     )}
                  </>
               ) : (
                  <div className="w-full h-fit flex justify-center items-center">
                     <p className="text-lg font-medium">No upcoming events available.</p>
                  </div>
               )}
            </>
         )}
      </>
   );
};

export default LiveEvents;
