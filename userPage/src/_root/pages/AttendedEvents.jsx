import React from "react";
import { useOutletContext } from "react-router-dom";

const AttendedEvents = () => {
   const { attendedEvents } = useOutletContext();
   console.log(attendedEvents);

   if(attendedEvents.length === 0) {
      return <div>No events attended</div>
   }

   return (
      <div>
         <h2>Attended Events</h2>
         <ul>
            {attendedEvents?.map((event, index) => (
               <li key={index}>{event.name}</li>
            ))}
         </ul>
      </div>
   );
};

export default AttendedEvents;
