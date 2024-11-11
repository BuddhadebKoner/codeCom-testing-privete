import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {

   return (
      <div className="flex items-center flex-col max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-4">
         <img
            className="max-h-[200px] max-w-[200px] object-cover rounded-full"
            src={event.imageUrl} alt="event-banner"
         />
         <div className="mt-10 flex flex-col gap-3">
            <Link
               to={`/events/${event.$id}`}
               className="text-xl font-semibold text-gray-800 underline"
            >
               {event.title.replace(/\b\w/g, char => char.toUpperCase())}
            </Link>
            <div className="w-full mt-4 flex justify-between items-center">
               <p className="text-sm text-black">
                  {event.eventPlace
                     .split(' ')
                     .map(word => word[0].toUpperCase())
                     .join('')}
               </p>
               <div className='w-fit flex items-center justify-center gap-2'>
                  <img
                     width={20}
                     src="/assets/calender-logo.svg" alt="event-icon" />
                  <p className="text-sm text-black">
                     {new Date(event.eventTime).toDateString().split(' ').slice(0, 3).join(' ')}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EventCard