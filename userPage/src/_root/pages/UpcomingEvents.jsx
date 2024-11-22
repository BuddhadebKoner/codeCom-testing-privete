import React from "react";
import UpcommingEventCards from "../../components/shared/UpcommingEventCards";
import { useGetUpcommingEvents } from "../../lib/react-query/queriesAndMutation";

const UpcomingEvents = () => {
  const { data: events = [], isLoading, isError } = useGetUpcommingEvents();

  // Get the current date
  const today = new Date();

  // Filter and sort events
  const filteredAndSortedEvents = events
    .filter((event) => new Date(event.eventTime) > today) // Only events after today
    .sort((a, b) => new Date(a.eventTime) - new Date(b.eventTime)); // Sort by eventTime

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading events. Please try again later.</p>}

      {!isLoading && filteredAndSortedEvents.length === 0 && (
        <p>No upcoming events available.</p>
      )}

      {/* Display date for each section */}
      {!isLoading &&
        filteredAndSortedEvents.map((eventItem) => {
          const eventDate = new Date(eventItem.eventTime);
          const formattedDate = eventDate.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          });

          return (
            <div className="w-full my-10" key={eventItem.eventId}>
              <p className="text-lg font-medium">{formattedDate}</p>
              <UpcommingEventCards eventItem={eventItem} />
            </div>
          );
        })}
    </div>
  );
};

export default UpcomingEvents;
