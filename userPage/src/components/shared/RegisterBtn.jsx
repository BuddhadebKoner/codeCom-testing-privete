import React, { useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const EventButtons = ({ event, togglePopup }) => {
   const { isAuthenticated, user } = useAuth();

   const isRegistrationOpen = Date.now() < new Date(event?.registerationEndsAt).getTime();
   const isRegistrationClosed = Date.now() > new Date(event?.registerationEndsAt).getTime() && Date.now() < new Date(event?.eventTime).getTime();
   const isEventDone = Date.now() > new Date(event?.eventTime).getTime();



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


      if (isRegistrationClosed) {
         return (
            <button
               className="text-gray-400 cursor-not-allowed"
               disabled
            >
               Registration Closed
            </button>
         );
      }

      if (isEventDone) {
         return (
            <button
               className="text-gray-400 cursor-not-allowed"
               disabled
            >
               Event Completed
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
