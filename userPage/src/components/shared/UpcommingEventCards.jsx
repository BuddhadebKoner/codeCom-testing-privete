import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcommingEventCards = ({ event }) => {
   const navigate = useNavigate();

   return (
      <div
         onClick={() => navigate(`/events/${event.$id}`)}
         key={event.eventId}
         className="relative min-w-[25rem] max-w-md h-80 rounded-lg shadow-lg cursor-pointer"
      >
         {/* Background image */}
         <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
         />
         {/* Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80"></div>
         {/* Content */}
         <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <h2 className="text-xl font-bold mb-2">{event.title}</h2>
            <p className="text-sm mb-2">{event.subtitle}</p>
            <p className="text-sm mb-4">
               {new Date(event.eventTime).toLocaleString()} | {event.city}
            </p>
         </div>
      </div>
   );
};

export default UpcommingEventCards;
