import React from "react";
import { useOutletContext } from "react-router-dom";

const AttendedEvents = () => {
   const { attendedEvents } = useOutletContext();
   console.log(attendedEvents);

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
