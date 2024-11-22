import { useState } from "react";
import { useParams } from "react-router-dom";
import BigLoader from "../../components/shared/BigLoader";
import OrganizersProfile from "../../components/shared/OrganizersProfile";
import { useEventById } from "../../lib/react-query/queriesAndMutation";
import { useAuth } from "../../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isPending } = useEventById(id || "");
  const { isAuthenticated, isLoading } = useAuth();

  // State for popup visibility
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    // overflow hidden on body to prevent scrolling
    document.body.style.overflow = showPopup ? "auto" : "hidden";
    setShowPopup(!showPopup);
  }

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-10">
        <BigLoader />
      </div>
    );
  }

  const eventDate = event.eventTime ? new Date(event.eventTime) : null;
  const timeString = eventDate
    ? eventDate.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    : "N/A";

  const endTime = event.eventLength ? new Date(event.eventTime) : null;
  if (endTime) {
    endTime.setHours(eventDate.getHours() + event.eventLength);
  }
  const endTimeString = endTime
    ? endTime.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    : "N/A";

  const timezoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="w-full h-full">
      <img
        className="w-full max-h-[500px] object-cover rounded-lg"
        src={event.imageUrl || "/default-image.jpg"}
        alt={event.title || "Event Image"}
      />
      <div className="w-full h-fit flex flex-col py-10 px-3">
        <div className="w-full h-fit flex justify-between items-start">
          <div className="w-full h-fit flex flex-col">
            <h1 className="text-2xl font-semibold">{event.title || "Event Title"}</h1>
            <p className="text-xl">{event.subtitle || "Event Subtitle"}</p>
          </div>
          {isAuthenticated ? (
            <div className="w-fit h-fit border-2 px-5 py-2 rounded-xl cursor-pointer">
              <button onClick={togglePopup}>Register</button>
            </div>
          ) : (
            <div className="w-fit h-fit flex text-center">
              <p>Login For Register</p>
            </div>
          )}
        </div>
        <p className="text-xl font-semibold mt-10">
          {event.eventPlace || "Event Place"}, {event.city || "City"}
        </p>
      </div>
      <div className="w-full h-fit bg-white px-5 py-2">
        <p className="text-black text-xl font-bold">
          {eventDate ? `${eventDate.toLocaleString("en-US", { month: "short" })} ${eventDate.getDate()}` : "N/A"},{" "}
          {timeString} – {endTimeString} ({timezoneOffset})
        </p>
      </div>
      <div className="w-full h-fit flex flex-col gap-5 mt-[5rem]">
        <p className="text-4xl font-normal">About this event</p>
        <p className="text-lg">{event.desc || "Event description not available."}</p>
      </div>
      <div className="w-full h-fit flex items-center flex-col flex-wrap gap-5 mt-[10rem]">
        <h1 className="text-center text-5xl">Organizers</h1>
        <div className="w-full h-fit flex justify-evenly flex-wrap gap-[150px] my-[5rem]">
          {event.organizers.map((organizer) => (
            <OrganizersProfile key={organizer.$id} organizer={organizer} />
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Register for Event</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={togglePopup}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
