import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import BigLoader from "../../components/shared/BigLoader";

const ActiveTickets = () => {
   const { userId } = useParams();
   const { user, isLoading, isAuthenticated } = useAuth();
   const navigate = useNavigate();
   const { attendedEvents } = useOutletContext();
   const [activeTickets, setActiveTickets] = useState([]);

   useEffect(() => {
      // Validate user authorization
      if (userId !== user?.$id) {
         toast.error("You are not authorized to view this page");
         navigate("/not-found-page");
      }
   }, [userId, user, isLoading, isAuthenticated]);

   useEffect(() => {
      // Filter active tickets based on current time
      const currentTime = new Date();
      const validTickets = attendedEvents.filter((ticket) => {
         const eventTime = new Date(ticket.events.eventTime);
         return ticket.events.isActive && eventTime > currentTime;
      });
      setActiveTickets(validTickets);
   }, [attendedEvents]);

   if (isLoading) {
      return (
         <div className="w-full h-fit flex items-center justify-center">
            <BigLoader />
         </div>
      );
   }

   return (
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Active Tickets</h1>
         {activeTickets.length > 0 ? (
            <div className="grid gap-4">
               {activeTickets.map((ticket) => (
                  <div key={ticket.entryId} className="border rounded-lg p-4 shadow-md">
                     <h2 className="text-xl font-semibold">{ticket.events.title}</h2>
                  </div>
               ))}
            </div>
         ) : (
            <p>No active tickets available.</p>
         )}
      </div>
   );
};

export default ActiveTickets;
