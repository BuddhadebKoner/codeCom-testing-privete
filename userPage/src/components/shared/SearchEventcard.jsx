import React from 'react';
import { Link } from 'react-router-dom';

const SearchEventcard = ({ event, toggleSearch }) => {
   return (
      <div className="w-full max-w-4xl mx-auto mt-5 relative p-4 h-30 rounded-lg overflow-hidden shadow-lg">
         {/* Background Image */}
         <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
               backgroundImage: `url(${event.imageUrl})`
            }}
         >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
         </div>
         {/* Text Content */}
         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <Link
               to={`/events/${event.$id}`}
               onClick={toggleSearch}
            >
               <h2 className="text-3xl font-bold mb-2 hover:underline">{event.title}</h2>
            </Link>
            <h3 className="text-lg mb-4">{event.subtitle}</h3>
            <p className="text-sm italic">{event.city}</p>
         </div>
      </div>
   );
};

export default SearchEventcard;
