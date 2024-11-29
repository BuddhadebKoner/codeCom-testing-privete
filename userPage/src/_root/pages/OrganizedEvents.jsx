import React from "react";
import { useOutletContext } from "react-router-dom";

const OrganizedEvents = () => {
   const { organizedEvents } = useOutletContext();
   console.log(organizedEvents);

   return (
      <div className="organized-events w-full p-4 bg-gray-800 text-white rounded-lg">
         {organizedEvents && organizedEvents.length > 0 ? (
            <ul className="space-y-2">
               {organizedEvents.map((event, index) => (
                  <li
                     key={event.eventId || index}
                     className="border-b border-gray-600 pb-2"
                  >
                     <h3 className="text-xl font-semibold">{event.title}</h3>
                     <p className="text-sm text-gray-400">{event.subtitle}</p>
                  </li>
               ))}
            </ul>
         ) : (
            <p className="text-gray-400">No events organized yet.</p>
         )}
      </div>
   );
};

export default OrganizedEvents;
