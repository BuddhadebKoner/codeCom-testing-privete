import UpcommingEventCards from "../../components/shared/UpcommingEventCards";
import { useGetUpcommingEvents } from "../../lib/react-query/queriesAndMutation";

const UpcomingEvents = () => {
  const { data: events = [], isLoading, isError } = useGetUpcommingEvents();

  // Filter for upcoming events
  const upcomingEvents = events.filter(eventItem => {
    const eventDate = new Date(eventItem.eventTime);
    const currentDate = new Date();
    return eventDate > currentDate; // Only events after current date/time
  });

  return (
    <>
      <div >
        {/* Display date for each section */}
        {upcomingEvents.map((eventItem) => {
          const eventDate = new Date(eventItem.eventTime);
          const formattedDate = eventDate.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
          });

          return (
            <div
              className="w-full my-10"
              key={eventItem.eventId}>
              <p>{formattedDate}</p>
              <UpcommingEventCards eventItem={eventItem} key={eventItem.eventId} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default UpcomingEvents;
