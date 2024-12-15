import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteEvent } from "../../lib/react-query/queriesAndMutation";

const EventCard = ({ event }) => {
   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

   const { mutate: deleteEvent, isPending: isDeletePending } = useDeleteEvent();

   const handleDelete = async () => {
      try {
         deleteEvent(event.$id, {
            onSuccess: () => {
               toast.success("Event deleted successfully");
               setIsDeletePopupOpen(false);
            },
            onError: () => toast.error("Error deleting event. Please try again."),
         });
      } catch (error) {
         console.error("Error deleting event:", error);
      }
   };

   return (
      <div className="w-fit h-fit bg-gray-800 text-gray-200 rounded-lg shadow-md overflow-hidden">
         <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
         <div className="p-4">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p className="text-sm text-gray-400">{event.subtitle}</p>
            <p className="mt-2 text-sm">{event.desc}</p>
            <div className="mt-4 text-sm">
               <p>
                  <strong>Date: </strong>
                  {new Date(event.eventTime).toLocaleDateString('en-IN')} at{" "}
                  {new Date(event.eventTime).toLocaleTimeString('en-IN')} | {event.eventLength} hours
               </p>
               <p>
                  <strong>Registration Ends: </strong>
                  {new Date(event.registerationEndsAt).toLocaleDateString('en-IN')} at{" "}
                  {new Date(event.registerationEndsAt).toLocaleTimeString('en-IN')}
               </p>
               <p>
                  <strong>Location: </strong>
                  <a href={event.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                     {event.eventPlace}, {event.city}
                  </a>
               </p>
               <p>
                  <strong>Venue: </strong>
                  {event.venue}
               </p>
            </div>
            <div className="mt-4 flex flex-col gap-4">
               {event.organizers.map((organizer, index) => (
                  <div key={index} className="flex items-center gap-4">
                     <img src={organizer.imageUrl} alt={organizer.name} className="w-10 h-10 rounded-full object-cover" />
                     <div>
                        <p>
                           <strong>Organizer: </strong>
                           {organizer.name}, {organizer.role}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="w-full h-fit mt-10 flex items-center justify-start gap-4">
               <Link
                  to={`/events/edit/${event.$id}`}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded-sm shadow hover:bg-blue-600 transition"
                  state={{ eventId: event.$id, eventData: event }}
               >
                  Edit
               </Link>
               <button
                  onClick={() => setIsDeletePopupOpen(true)}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded-sm shadow hover:bg-red-600 transition"
               >
                  Delete
               </button>

               <Link
                  to={`/events/add-extra-details/${event.$id}`}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded-sm shadow hover:bg-blue-600 transition"
                  state={{ eventId: event.$id, eventData: event }}
               >
                  Add Event Data
               </Link>
            </div>
         </div>
         {isDeletePopupOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
               <div className="bg-gray-700 text-white rounded-lg shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Are you sure you want to delete this event?</h3>
                  <div className="flex justify-end gap-4">
                     <button
                        onClick={() => setIsDeletePopupOpen(false)}
                        className="px-4 py-2 bg-gray-500 rounded text-white hover:bg-gray-600"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleDelete}
                        disabled={isDeletePending}
                        className={`px-4 py-2 rounded text-white ${isDeletePending ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                           }`}
                     >
                        {isDeletePending ? "Deleting..." : "Confirm"}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default EventCard;
