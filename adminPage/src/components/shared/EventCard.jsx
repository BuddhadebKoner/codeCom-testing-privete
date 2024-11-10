import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
   const {
      eventId,
      title,
      subtitle,
      desc,
      eventTime,
      eventPlace,
      locationUrl,
      maxCapacity,
      registerUsersCount,
      entryPass,
   } = event;

   const eventDate = new Date(eventTime).toLocaleDateString();
   const eventHour = new Date(eventTime).toLocaleTimeString();
   const eventLink = `http://${window.location.hostname}:5173/Allevents/evt=${eventId}`;

   // State for event status
   const [isActive, setIsActive] = useState(event?.isActive);
   const handelEventActiveInactive = async () => {
      try {
         const updatedEvent = await updateEvent(event.$id, { isActive: !isActive });
         if (updatedEvent) {
            // console.log('Event updated:', updatedEvent);
            setIsActive(!isActive);
         }
      } catch (error) {
         console.error('Error updating event:', error);
      }
   }

   return (
      <div className="w-full max-w-lg mx-auto dark:bg-gray-900 shadow-xl rounded-2xl  my-8">
         {/* Event Header */}
         <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <Link
               to={`/event/${event.$id}`}
               className="text-3xl font-bold text-gray-800 dark:text-white mb-4 hover:underline">
               {title}
            </Link>
            <p className='"text-gray-600 dark:text-gray-300 text-lg mb-4'>{subtitle}</p>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">{desc}</p>
         </div>

         {/* Event Details */}
         <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-6">
               <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">{eventDate}</p>
               </div>
               <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">{eventHour}</p>
               </div>
               <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Place</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">{eventPlace}</p>
               </div>
               {locationUrl && (
                  <div>
                     <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                     <a
                        href={locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-lg font-medium"
                     >
                        View Location
                     </a>
                  </div>
               )}
            </div>
         </div>

         {/* Event Status with Toggle Button */}
         <div className="p-8 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                     }`}
               >
                  {isActive ? 'Active' : 'Inactive'}
               </span>

               {/* Toggle Button */}
               <label className="relative inline-flex items-center cursor-pointer">
                  <input
                     type="checkbox"
                     checked={isActive}
                     onChange={handelEventActiveInactive}
                     className="sr-only peer"
                  />
                  <div
                     className="w-11 h-6 bg-gray-300 peer-focus:outline-none dark:bg-gray-700 dark:peer-focus:ring-4 dark:peer-focus:ring-blue-800 peer-checked:bg-green-500 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                  ></div>
               </label>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
               <p>
                  <span className="font-semibold">Capacity:</span> {maxCapacity}
               </p>
               <p>
                  <span className="font-semibold">Registered:</span> {entryPass?.length || registerUsersCount || 0}
               </p>
            </div>
         </div>

         {/* QR Code for Event */}
         <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Scan to Register</h3>
            <div className="flex justify-center bg-white p-6 rounded-xl shadow-inner">
               {eventLink ? (
                  <QRCodeCanvas
                     value={eventLink}
                     size={180}
                     bgColor="#ffffff"
                     fgColor="#000000"
                     level="H"
                  />
               ) : (
                  <p className="text-red-500">QR code data is missing</p>
               )}
            </div>
         </div>
         {/* event organizers */}
         <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Organizers</h3>
            <div className="w-full h-full flex flex-col items-start">
               {event.organizers?.map((organizer) => (
                  <div key={organizer.userId} className="flex items-center gap-5 pt-4">
                     <img
                        src={organizer.imageUrl}
                        alt={organizer.name}
                        className="w-8 h-8 rounded-full"
                     />
                     <p className="text-gray-800 dark:text-white font-semibold">{organizer.name}</p>
                     <p className='bg-white text-black px-4 rounded-full font-semibold'>
                        {organizer.role
                           .replace(/-/g, ' ') // Replace hyphens with spaces
                           .replace(/\b\w/g, (char) => char.toUpperCase())
                        }
                     </p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default EventCard;
