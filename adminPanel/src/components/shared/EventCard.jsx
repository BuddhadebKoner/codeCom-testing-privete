import React from "react";

const EventCard = ({ event }) => {
   return (
      <div className="w-fit h-fit bg-gray-800 text-gray-200 rounded-lg shadow-md overflow-hidden">
         <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-48 object-cover"
         />
         <div className="p-4">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm text-gray-400">{event.subtitle}</p>
            <p className="mt-2 text-sm">{event.desc}</p>
            <div className="mt-4 text-sm">
               <p>
                  <strong>Date: </strong>
                  {new Date(event.eventTime).toLocaleDateString()} at{" "}
                  {new Date(event.eventTime).toLocaleTimeString()}
               </p>
               <p>
                  <strong>Registration Ends: </strong>
                  {new Date(event.registerationEndsAt).toLocaleDateString()} at {" "}
                  {new Date(event.registerationEndsAt).toLocaleTimeString()}
               </p>
               <p>
                  <strong>Capacity: </strong>{event.maxCapacity} attendees
               </p>
               <p>
                  <strong>Location: </strong>
                  <a
                     href={event.locationUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-400 underline"
                  >
                     {event.eventPlace}, {event.city}
                  </a>
               </p>
            </div>
            <div className="mt-4 flex flex-col gap-4">
               {event.organizers.map((organizer, index) => (
                  <div key={index} className="flex items-center gap-4">
                     <img
                        src={organizer.imageUrl}
                        alt={organizer.name}
                        className="w-10 h-10 rounded-full object-cover"
                     />
                     <div>
                        <p>
                           <strong>Organizer: </strong>
                           {organizer.name}, {organizer.role}
                        </p>
                     </div>
                  </div>
               ))}
            </div>

         </div>
      </div>
   );
};

export default EventCard;
