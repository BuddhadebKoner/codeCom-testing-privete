// src/pages/Allevents.jsx
import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../../lib/appwrite/api';
import EventCard from '../../components/shared/EventCard';

const Allevents = () => {
  const [events, setEvents] = useState([]);

  const handelGetAllEvents = async () => {
    try {
      const allEvents = await getAllEvents();
      if (allEvents) {
        console.log('All Events:', allEvents);
        setEvents(allEvents);
      }
    } catch (error) {
      console.error('Error getting all events:', error);
    }
  };

  useEffect(() => {
    handelGetAllEvents();
  }, []);


  return (
    <div className="w-full p-4 flex-col">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className='w-full h-fit flex flex-col justify-center items-center'>
        {events.map((event) => (
          <EventCard key={event.eventId} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Allevents;
