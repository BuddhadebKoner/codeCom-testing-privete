import React, { Suspense, useEffect } from 'react'
import { useGetUpcommingEvents } from '../../lib/react-query/queriesAndMutation';
import { useInView } from 'react-intersection-observer';
import BigLoader from '../../components/shared/BigLoader';
import UpcommingEventCards from '../../components/shared/UpcommingEventCards';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



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
                  <div className="relative w-full h-[80vh] ">
                     <h1 className='text-xl font-semibold'>No Upcomming Events</h1>
                     <Suspense >
                        <DotLottieReact
                           src="/lottieFiles/not-found.lottie"
                           loop
                           autoplay
                           className='w-1/2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                        />
                     </Suspense>
                  </div>
               )}
            </>
         )
         }
      </>
   );
};

export default LiveEvents;
