import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcommingEventCards = ({ event }) => {
   const navigate = useNavigate();

   if (!event.isActive) {
      return null;
   }

   return (
      <div
         onClick={() => navigate(`/events/${event.$id}`)}
         key={event.eventId}
         className="relative group w-full max-w-md h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer"
         style={{ backgroundImage: `url(${event.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
         <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
            <h2 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">{event.title}</h2>
            <p className="text-sm mb-2">{event.subtitle}</p>
            <p className="text-sm mb-4">
               {new Date(event.eventTime).toLocaleString()} | {event.city}
            </p>
            <a
               href={event.locationUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-400 underline text-sm mb-4 hover:text-blue-300"
            >
               View Location
            </a>
         </div>
      </div>
   );
};

export default UpcommingEventCards;
