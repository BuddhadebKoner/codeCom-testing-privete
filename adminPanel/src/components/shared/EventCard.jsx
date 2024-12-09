import React, { useState } from "react";
import { useDeactiveEvent, useDeleteEvent, useToggleShowOnHomePage, useToggleTicketRelease } from "../../lib/react-query/queriesAndMutation";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EventCard = ({ event }) => {
   const [eventState, setEventState] = useState({
      isActive: event?.isActive,
      isShowingInHomePage: event?.IsShowingInHomePage,
      isTicketRelesed: event?.isTicketRelesed,
   });
   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

   const { mutate: toggleIsActive, isPending } = useDeactiveEvent();
   const { mutate: toggleShowHomePage, isPending: isShowHomeLoading } = useToggleShowOnHomePage();
   const { mutate: toggleTicketRelesed, isPending: isTicketRelesedLoading } = useToggleTicketRelease();
   const { mutate: deleteEvent, isPending: isDeletePending } = useDeleteEvent();


   const toggleHandler = async (toggleType) => {
      try {
         const updateData = { eventId: event.$id, [toggleType]: eventState[toggleType] };

         if (toggleType === "isActive") {
            await toggleIsActive(updateData, {
               onSuccess: () => {
                  toast.success("Event toggled successfully");
                  setEventState(prevState => ({ ...prevState, isActive: !prevState.isActive }));
               },
               onError: () => toast.error("Error toggling event. Please try again."),
            });
         } else if (toggleType === "isShowingInHomePage") {
            await toggleShowHomePage(updateData, {
               onSuccess: () => {
                  toast.success("Event toggled successfully");
                  setEventState(prevState => ({ ...prevState, isShowingInHomePage: !prevState.isShowingInHomePage }));
               },
               onError: () => toast.error("Error toggling event. Please try again."),
            });
         } else if (toggleType === "isTicketRelesed") {
            await toggleTicketRelesed(updateData, {
               onSuccess: () => {
                  toast.success("Event toggled successfully");
                  setEventState(prevState => ({ ...prevState, isTicketRelesed: !prevState.isTicketRelesed }));
               },
               onError: () => toast.error("Error toggling event. Please try again."),
            });
         }
      } catch (error) {
         console.error(`Error toggling ${toggleType}:`, error);
      }
   };

   const handleDelete = async () => {
      try {
         await deleteEvent(event.$id, {
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
               <p><strong>Date: </strong>{new Date(event.eventTime).toLocaleDateString()} at {new Date(event.eventTime).toLocaleTimeString()} | {event.eventLength} hours</p>
               <p><strong>Registration Ends: </strong>{new Date(event.registerationEndsAt).toLocaleDateString()} at {new Date(event.registerationEndsAt).toLocaleTimeString()}</p>
               <p><strong>Location: </strong><a href={event.locationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{event.eventPlace}, {event.city}</a></p>
               <p><strong>Venue: </strong>{event.venue}</p>
            </div>
            <div className="mt-4 flex flex-col gap-4">
               {event.organizers.map((organizer, index) => (
                  <div key={index} className="flex items-center gap-4">
                     <img src={organizer.imageUrl} alt={organizer.name} className="w-10 h-10 rounded-full object-cover" />
                     <div><p><strong>Organizer: </strong>{organizer.name}, {organizer.role}</p></div>
                  </div>
               ))}
            </div>
            <div className="w-full h-fit mt-10 flex items-center justify-start gap-4">
               {/* Toggle Active Event */}
               <div className="flex flex-col items-center">
                  <button
                     onClick={() => toggleHandler("isActive")}
                     disabled={isPending}
                     className={`relative flex items-center w-12 h-6 rounded-full transition-colors duration-300 ${eventState.isActive ? "bg-green-400" : "bg-gray-400"} ${isPending && "cursor-not-allowed opacity-50"}`}
                  >
                     <span className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${eventState.isActive ? "translate-x-6" : "translate-x-1"}`}></span>
                  </button>
                  <span className="mt-1 text-xs text-gray-300">{eventState.isActive ? "Active" : "Inactive"}</span>
               </div>

               {/* Toggle Show on Home Page */}
               <div className="flex flex-col items-center">
                  <button
                     onClick={() => toggleHandler("isShowingInHomePage")}
                     disabled={isShowHomeLoading}
                     className={`relative flex items-center w-12 h-6 rounded-full transition-colors duration-300 ${eventState.isShowingInHomePage ? "bg-green-400" : "bg-gray-400"} ${isShowHomeLoading && "cursor-not-allowed opacity-50"}`}
                  >
                     <span className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${eventState.isShowingInHomePage ? "translate-x-6" : "translate-x-1"}`}></span>
                  </button>
                  <span className="mt-1 text-xs text-gray-300">{eventState.isShowingInHomePage ? "Visible" : "Hidden"}</span>
               </div>

               {/* Toggle Ticket Released */}
               <div className="flex flex-col items-center">
                  <button
                     onClick={() => toggleHandler("isTicketRelesed")}
                     disabled={isTicketRelesedLoading}
                     className={`relative flex items-center w-12 h-6 rounded-full transition-colors duration-300 ${eventState.isTicketRelesed ? "bg-green-400" : "bg-gray-400"} ${isTicketRelesedLoading && "cursor-not-allowed opacity-50"}`}
                  >
                     <span className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 transform ${eventState.isTicketRelesed ? "translate-x-6" : "translate-x-1"}`}></span>
                  </button>
                  <span className="mt-1 text-xs text-gray-300">{eventState.isTicketRelesed ? "Tickets Released" : "Not Released"}</span>
               </div>

               {/* Edit Button */}
               <Link
                  to={`/events/edit/${event.$id}`}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
                  state={{
                     eventId: event.$id,
                     eventData: {
                        organizers: event?.organizers
                           ?.map(organizer => organizer.$id)
                           ?.join(",") || "",
                        title: event.title,
                        desc: event.desc,
                        subtitle: event.subtitle,
                        eventTime: event.eventTime,
                        registerationEndsAt: event.registerationEndsAt,
                        maxCapacity: event.maxCapacity,
                        eventLength: event.eventLength,
                        eventPlace: event.eventPlace,
                        city: event.city,
                        venue: event.venue,
                        locationUrl: event.locationUrl,
                        imageUrl: event.imageUrl,
                     }
                  }}
               >
                  Edit
               </Link>

               {/* Delete Button */}
               <button
                  onClick={() => setIsDeletePopupOpen(true)}
                  className="px-3 py-1 text-xs bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
               >
                  Delete
               </button>
            </div>
         </div>

         {/* Delete Confirmation Popup */}
         {
            isDeletePopupOpen && (
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
                           className={`px-4 py-2 rounded text-white ${isDeletePending ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
                        >
                           {isDeletePending ? "Deleting..." : "Confirm"}
                        </button>
                     </div>
                     {isDeletePending && (
                        <p className="mt-4 text-red-500 text-sm">Failed to delete event.</p>
                     )}
                  </div>
               </div>
            )
         }
      </div >
   );
};

export default EventCard;
