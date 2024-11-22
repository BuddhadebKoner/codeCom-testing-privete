import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => {
   // console.log(event.imageUrl);


   return (
      <div className="min-w-[300px] max-w-[310px] flex items-center flex-col rounded-lg overflow-hidden shadow-lg border-2  p-4">
         <img
            className="h-[200px] w-[200px] object-cover rounded-full"
            src={event.imageUrl} alt="event-banner"
         />
         <div className="w-full mt-10 flex flex-col gap-3">
            <Link
               to={`/events/${event.$id}`}
               className="w-full text-center text-xl font-semibold text-white underline"
            >
               {event.title.replace(/\b\w/g, char => char.toUpperCase())}
            </Link>
            <div className="w-full mt-4 flex justify-between items-center">
               <p className="text-sm  text-white">
                  {event.eventPlace
                     .split(' ')
                     .map(word => word[0].toUpperCase())
                     .join('')}
               </p>
               <div className='w-fit flex items-center justify-center gap-2'>
                  <img
                     className='w-4 h-4'
                     src="/assets/calender-logo.svg" alt="event-icon" />
                  <p className="text-sm  text-white">
                     {new Date(event.eventTime).toDateString().split(' ').slice(0, 3).join(' ')}
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EventCard