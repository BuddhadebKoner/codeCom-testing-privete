import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../../lib/appwrite/api";
import BigLoader from "../../components/shared/BigLoader";
import OrganizersProfile from "../../components/shared/OrganizersProfile";
import { useEventById } from "../../lib/react-query/queriesAndMutation";

const EventDetails = () => {
  // Get event id from the URL
  const { id } = useParams();

  const { data: event, isPending } = useEventById(id || '');

  if (isPending) {
    return (
      <>
        <div className="w-full h-full flex justify-center items-center mt-10">
          <BigLoader />
        </div>
      </>
    );
  }

  // Ensure event fields are defined
  const eventDate = event.eventTime ? new Date(event.eventTime) : null;
  const timeString = eventDate ? eventDate.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) : 'N/A';

  const endTime = event.eventLength ? new Date(event.eventTime) : null;
  if (endTime) {
    endTime.setHours(eventDate.getHours() + event.eventLength);
  }
  const endTimeString = endTime ? endTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) : 'N/A';

  const timezoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="w-full h-full">
        <img
          className="w-full max-h-[500px] object-cover rounded-lg"
          src={event.imageUrl || '/default-image.jpg'} // Provide fallback image
          alt={event.title || 'Event Image'}
        />
        <div className="w-full h-fit flex flex-col py-10 px-3">
          <h1 className="text-2xl font-semibold">{event.title || 'Event Title'}</h1>
          <p className="text-xl">{event.subtitle || 'Event Subtitle'}</p>
          <p className="text-xl font-semibold mt-10">
            {event.eventPlace || 'Event Place'}, {event.city || 'City'}
          </p>
        </div>
        <div className="w-full h-fit bg-white px-5 py-2">
          {/* Date and time */}
          <p className="text-black text-xl font-bold">
            {eventDate ? `${eventDate.toLocaleString('en-US', { month: 'short' })} ${eventDate.getDate()}` : 'N/A'},
            {timeString} – {endTimeString} ({timezoneOffset})
          </p>
        </div>
        <div className="w-full h-fit flex flex-col gap-5 mt-[5rem]">
          <p className="text-4xl font-normal">About this event</p>
          <p className="text-lg">{event.desc || 'Event description not available.'}</p>
        </div>
        <div className="w-full h-fit flex items-center flex-col flex-wrap gap-5 mt-[10rem]">
          <h1 className="text-center text-5xl">Organizers</h1>
          <div className="w-full h-fit flex justify-evenly flex-wrap gap-[150px] my-[5rem]">
            {event.organizers.map((organizer) => (
              <OrganizersProfile
                key={organizer.$id}
                organizer={organizer}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
