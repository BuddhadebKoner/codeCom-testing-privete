import React, { useEffect } from 'react'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import BigLoader from '../../components/shared/BigLoader';

const ActiveTickets = () => {
   const { userId } = useParams();
   const { user, isLoading, isAuthenticated } = useAuth();
   const navigate = useNavigate();
   const { attendedEvents } = useOutletContext();

   useEffect(() => {
      console.log(attendedEvents);
   }, [attendedEvents])

   if (isLoading) {
      return (
         <div className="w-full h-fit flex items-center justify-center">
            <BigLoader />
         </div>
      )
   }

   useEffect(() => {
      if (userId !== user?.$id) {
         toast.error("You are not authorized to view this page");
         console.log("You are not authorized to view this page");
         navigate("/not-found-page");
      }
   }, [userId, user, isLoading, isAuthenticated]);

   return (
      <div>ActiveTickets</div>
   )
}

export default ActiveTickets