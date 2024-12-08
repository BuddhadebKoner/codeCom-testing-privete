import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const OrganizedEvents = () => {
   const { organizedEvents } = useOutletContext();

   const isPastEvent = (eventTime) => {
      const now = new Date();
      const eventDate = new Date(eventTime);
      return now > eventDate;
   };

   const upcomingEvents = organizedEvents.filter(
      (event) => !isPastEvent(event.eventTime)
   );

   const HoldEvents = organizedEvents.filter((event) =>
      isPastEvent(event.eventTime)
   );

   return (
      <div className="organized-events w-full p-4 bg-gray-800 text-white rounded-lg space-y-8">
         {/* Upcoming Events Section */}
         <div>
            <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
               <ul className="space-y-4">
                  {upcomingEvents.map((event) => (
                     <li
                        key={event.eventId}
                        className="p-4 border border-gray-600 rounded-lg flex justify-between items-start"
                     >
                        <div className="flex-1">
                           <Link to={`/events/${event.$id}`}>
                              <h3 className="text-xl font-semibold hover:underline">
                                 {event.title}
                              </h3>
                           </Link>
                           <p className="text-sm text-gray-400">{event.subtitle}</p>
                           <p className="text-sm mt-2">{event.desc}</p>
                        </div>
                        <div className="text-right ml-4">
                           <p className="text-sm">
                              {new Date(event.eventTime).toLocaleDateString("en-IN", {
                                 day: "2-digit",
                                 month: "short",
                                 year: "numeric",
                              })}
                           </p>
                           <p className="text-green-500 text-sm">Open for Registration</p>
                        </div>
                     </li>
                  ))}
               </ul>
            ) : (
               <p className="text-gray-400">No upcoming events.</p>
            )}
         </div>

         {/* Past Events Section */}
         <div>
            <h2 className="text-2xl font-bold mb-4">Attended Events</h2>
            {HoldEvents.length > 0 ? (
               <ul className="space-y-4">
                  {HoldEvents.map((event) => (
                     <li
                        key={event.eventId}
                        className="p-4 border border-gray-600 rounded-lg flex justify-between items-start"
                     >
                        <div className="flex-1">
                           <Link to={`/events/${event.$id}`}>
                              <h3 className="text-xl font-semibold hover:underline">
                                 {event.title}
                              </h3>
                           </Link>
                           <p className="text-sm text-gray-400">{event.subtitle}</p>
                           <p className="text-sm mt-2">{event.desc}</p>
                        </div>
                        <div className="text-right ml-4">
                           <p className="text-sm">
                              {new Date(event.eventTime).toLocaleDateString("en-IN", {
                                 day: "2-digit",
                                 month: "short",
                                 year: "numeric",
                              })}
                           </p>
                           <p className="text-red-500 text-sm">Registration Closed</p>
                        </div>
                     </li>
                  ))}
               </ul>
            ) : (
               <p className="text-gray-400">No events attended yet.</p>
            )}
         </div>
      </div>
   );
};

export default OrganizedEvents;
