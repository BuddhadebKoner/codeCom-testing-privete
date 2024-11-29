import React from 'react'
import { useNavigate } from 'react-router-dom'

const UpcommingEventCards = ({ event }) => {
   const navigate = useNavigate();
   return (
      <>
         <div
            onClick={
               () => navigate(`/events/${event.$id}`)
            }
            key={event.eventId}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
         >
            <img
               src={event.imageUrl}
               alt={event.title}
               className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
               {event.subtitle}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
               {new Date(event.eventTime).toLocaleString()} | {event.city}
            </p>
            <a
               href={event.locationUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="text-blue-500 hover:underline mt-2 block"
            >
               View Location
            </a>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
               Organized by: {event.organizers[0]?.name}
            </p>
         </div>
      </>
   )
}

export default UpcommingEventCards