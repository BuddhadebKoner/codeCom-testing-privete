import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const EventCard = ({ event }) => {
   const cardRef = useRef(null);

   useEffect(() => {
      const card = cardRef.current;

      // GSAP Hover Animation
      const hoverAnimation = gsap.timeline({ paused: true });
      hoverAnimation
         .to(card, {
            scale: 1.05,
            backgroundColor: "#2a2a2a",
            borderColor: "#4caf50",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
            duration: 0.3,
         })
         .to(
            card.querySelector(".event-card-title"),
            { color: "#4caf50", duration: 0.3 },
            "<"
         );

      card.addEventListener("mouseenter", () => hoverAnimation.play());
      card.addEventListener("mouseleave", () => hoverAnimation.reverse());

      return () => {
         card.removeEventListener("mouseenter", () => hoverAnimation.play());
         card.removeEventListener("mouseleave", () => hoverAnimation.reverse());
      };
   }, []);

   return (
      <div
         ref={cardRef}
         className="event-card-container min-w-[300px] max-w-[310px] flex items-center flex-col rounded-lg overflow-hidden border-2 p-4 transition-all cursor-pointer"
      >
         <img
            className="event-card-image h-[200px] w-[200px] object-cover rounded-full"
            src={event.imageUrl}
            alt="event-banner"
         />
         <div className="event-card-content w-full mt-10 flex flex-col gap-3">
            <Link
               to={`/events/${event.$id}`}
               className="event-card-title w-full text-center text-xl font-semibold text-white underline"
            >
               {event.title.replace(/\b\w/g, char => char.toUpperCase())}
            </Link>
            <div className="event-card-details w-full mt-4 flex justify-between items-center">
               <p className="text-sm text-white">
                  {event.eventPlace
                     .split(' ')
                     .map(word => word[0].toUpperCase())
                     .join('')}
               </p>
               <div className="w-fit flex items-center justify-center gap-2">
                  <img
                     className="w-4 h-4"
                     src="/assets/calender-logo.svg"
                     alt="event-icon"
                  />
                  <p className="text-sm text-white">
                     {new Date(event.eventTime).toDateString().split(' ').slice(0, 3).join(' ')}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default EventCard;
