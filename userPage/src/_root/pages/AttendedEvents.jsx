import React from "react";
import { Link, useOutletContext } from "react-router-dom";

const AttendedEvents = () => {
   const { attendedEvents } = useOutletContext();
   console.log(attendedEvents);

   if (!attendedEvents || attendedEvents.length === 0) {
      return (
         <div className="attended-events w-full p-4 bg-gray-800 text-white rounded-lg">
            <p className="text-gray-400">No events found.</p>
         </div>
      );
   }

   const currentDateTime = new Date();

   const upcomingEvents = attendedEvents.filter((event) => {
      const eventDate = new Date(event.events.eventTime);
      return !event.scanTimeStamp && currentDateTime < eventDate;
   });

   const attendedEventsList = attendedEvents.filter((event) => event.scanTimeStamp);

   return (
      <div className="attended-events w-full p-4 bg-gray-800 text-white rounded-lg">
         {/* Upcoming Events */}
         {upcomingEvents.length > 0 ? (
            <div className="mb-8">
               <h3 className="text-xl font-semibold mb-4 text-white">Upcoming Events</h3>
               <ul className="space-y-2">
                  {upcomingEvents.map((event, index) => (
                     <li
                        key={index}
                        className="p-4 border border-gray-600 rounded-lg flex justify-between items-start"
                     >
                        <div className="flex flex-col">
                           <Link
                              to={`/events/${event.events.$id}`}
                           >
                              <h3 className="text-lg font-bold hover:underline">{event.events.title}</h3>
                           </Link>
                           <p className="text-sm text-gray-400">
                              {new Date(event.events.eventTime).toLocaleDateString("en-US", {
                                 day: "2-digit",
                                 month: "short",
                                 year: "numeric",
                              })}{" "}
                              {new Date(event.events.eventTime).toLocaleTimeString("en-US", {
                                 hour: "2-digit",
                                 minute: "2-digit",
                                 second: "2-digit",
                                 hour12: true,
                              })}
                           </p>
                           <p className="text-sm text-gray-400">{event.events.eventPlace}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         ) : (
            <p className="text-gray-400">No upcoming events.</p>
         )}

         {/* Attended Events */}
         {attendedEventsList.length > 0 ? (
            <div>
               <h3 className="text-xl font-semibold mb-4 text-blue-400">Attended Events</h3>
               <ul className="space-y-2">
                  {attendedEventsList.map((event, index) => (
                     <li
                        key={index}
                        className="flex justify-between items-center border-b border-gray-600 pb-2"
                     >
                        <div className="flex flex-col">
                           <h3 className="text-lg font-bold hover:underline">{event.events.title}</h3>
                           <p className="text-sm text-gray-400">
                              {new Date(event.events.eventTime).toLocaleDateString("en-US", {
                                 day: "2-digit",
                                 month: "short",
                                 year: "numeric",
                              })}{" "}
                              {new Date(event.events.eventTime).toLocaleTimeString("en-US", {
                                 hour: "2-digit",
                                 minute: "2-digit",
                                 second: "2-digit",
                                 hour12: true,
                              })}
                           </p>
                           <p className="text-sm text-gray-400">{event.events.eventPlace}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         ) : (
            <p className="text-gray-400">No events attended yet.</p>
         )}
      </div>
   );
};

export default AttendedEvents;
