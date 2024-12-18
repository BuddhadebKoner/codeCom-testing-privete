import React, { useEffect, } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const EventButtons = ({ event, togglePopup }) => {
   const { isAuthenticated } = useAuth();

   const isRegistrationOpen = Date.now() < new Date(event?.registerationEndsAt).getTime();
   const isRegistrationClosed = Date.now() > new Date(event?.registerationEndsAt).getTime() && Date.now() < new Date(event?.eventTime).getTime();
   const isEventLive = Date.now() > new Date(event?.eventTime).getTime();
   const isEventDone = Date.now() > new Date(event?.eventTime).getTime() && event?.entryPass.length == 0;
   const isEventActive = event?.isActive



   const registerationDate = new Date(event?.registerationEndsAt).toLocaleString('en-IN')



   const renderButton = () => {
      if (!isAuthenticated) {
         return (
            <Link
               to="/sign-in"
               className="text-blue-400"
            >
               Sign in to Register
            </Link>
         );
      }

      if (isRegistrationOpen && isEventActive) {
         return (
            <>
               <div className="flex w-full h-full flex-col justify-center items-end">
                  <button
                     className="text-blue-400"
                     onClick={togglePopup}
                  >
                     Register Now
                  </button>
                  {
                     event.isActive && (
                        <p className="text-red-500">{registerationDate}</p>
                     )
                  }
               </div>
            </>
         );
      }


      if (isRegistrationClosed || !isEventActive) {
         return (
            <button
               className="text-gray-400 cursor-not-allowed"
               disabled
            >
               Registration Closed
            </button>
         );
      }

      if (isEventLive) {
         return (
            <button
               className="text-gray-400 cursor-not-allowed"
               disabled
            >
               Live
            </button>
         );
      }

      if (isEventDone) {
         return (
            <button
               className="text-gray-400 cursor-not-allowed"
               disabled
            >
               Event Done
            </button>
         );
      }
   };

   return (
      <div className="flex justify-center gap-4 mt-4">
         {renderButton()}
      </div>
   );
};

export default EventButtons;
