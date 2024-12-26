import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
   return (
      <Link
         to={`/events/${event.$id}`}
         className="group perspective-1000 transform-style-3d">
         <div className="min-w-[300px] max-w-[310px] flex items-center flex-col rounded-lg overflow-hidden border-2 p-4 transition-transform duration-500 group-hover:rotate-y-12">
            <img
               className="h-[200px] w-[200px] object-cover rounded-full"
               src={event.imageUrl}
               alt="event-banner"
            />
            <div className="w-full mt-10 flex flex-col gap-3">
               <p
                  className="w-full text-center text-xl font-semibold text-white underline"
               >
                  {event.title.replace(/\b\w/g, char => char.toUpperCase())}
               </p>
               <div className="w-full mt-4 flex justify-between items-center">
                  <p className="text-sm text-white">
                     {event.eventPlace
                        .split(' ')
                        .map(word => word[0].toUpperCase())
                        .join('')}
                  </p>
                  <div className="w-fit flex items-center justify-center gap-2">
                     <img
                        className="w-4 h-4"
                        src="/assets/calender-logo.svg"
                        alt="event-icon"
                     />
                     <p className="text-sm text-white">
                        {new Date(event.eventTime).toDateString().split(' ').slice(0, 3).join(' ')}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default EventCard;
