import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BigLoader from "../../components/shared/BigLoader";
import OrganizersProfile from "../../components/shared/OrganizersProfile";
import { useEventById, useGenerateEntryPass } from "../../lib/react-query/queriesAndMutation";
import { useAuth } from "../../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isPending } = useEventById(id || "");
  const { mutateAsync: generateEntryPass } = useGenerateEntryPass();
  const { isAuthenticated, user } = useAuth();

  const [formLoading, setFormLoading] = useState(false);

  const [registerForm, setRegisterForm] = useState({
    purpus: "",
    stream: "",
    department: "",
    phone: "",
    institute: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRegisterOnEvent = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    // fetch current timestamp
    const timeStamp = Date.now();
    // make entryId
    const entryId = `${event.$id}+${user.$id}+${timeStamp}`

    // make a passData
    const passData = {
      entryId: entryId,
      users: user.$id,
      events: event.$id,
      purpus: purpus,
      stream: stream,
      department: department,
      institute: institute
    }
    

    setFormLoading(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    document.body.style.overflow = showPopup ? "auto" : "hidden";
    setShowPopup(!showPopup);

    // Cleanup the form data
    if (!showPopup) {
      setRegisterForm({
        purpus: "",
        stream: "",
        department: "",
        phone: "",
        institute: "",
      });
    }
  };

  if (isPending || formLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-10">
        <BigLoader />
      </div>
    );
  }

  const eventDate = event?.eventTime ? new Date(event.eventTime) : null;
  const timeString = eventDate
    ? eventDate.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    : "N/A";

  const endTime = event?.eventTime ? new Date(event.eventTime) : null;
  if (endTime && event?.eventLength) {
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
        src={event?.imageUrl || "/default-image.jpg"}
        alt={event?.title || "Event Image"}
      />
      <div className="w-full h-fit flex flex-col py-10 px-3">
        <div className="w-full h-fit flex justify-between items-start">
          <div className="w-full h-fit flex flex-col">
            <h1 className="text-2xl font-semibold">{event?.title || "Event Title"}</h1>
            <p className="text-xl">{event?.subtitle || "Event Subtitle"}</p>
          </div>
          {isAuthenticated ? (
            <div className="w-fit h-fit cursor-pointer">
              <button onClick={togglePopup} className="border-2 px-5 py-2 rounded-xl">
                Register
              </button>
            </div>
          ) : (
            <div className="w-fit h-fit flex text-center">
              <Link to="/sign-in" className="w-fit h-fit cursor-pointer">
                Login to Register
              </Link>
            </div>
          )}
        </div>
        <p className="text-xl font-semibold mt-10">
          {event?.eventPlace || "Event Place"}, {event?.city || "City"}
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
        <p className="text-lg">{event?.desc || "Event description not available."}</p>
      </div>
      <div className="w-full h-fit flex items-center flex-col flex-wrap gap-5 mt-[10rem]">
        <h1 className="text-center text-5xl">Organizers</h1>
        <div className="w-full h-fit flex justify-evenly flex-wrap gap-[150px] my-[5rem]">
          {event?.organizers?.map((organizer) => (
            <OrganizersProfile key={organizer.$id} organizer={organizer} />
          )) || "No organizers available."}
        </div>
      </div>

      {showPopup && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-black">Register for Event</h2>
              <form onSubmit={handleRegisterOnEvent}>
                {["purpus", "stream", "department", "phone", "institute"].map((field) => (
                  <div key={field} className="mb-4">
                    <label htmlFor={field} className="block text-gray-700 font-semibold capitalize">
                      {field}
                    </label>
                    <input
                      value={registerForm[field]}
                      onChange={handleInputChange}
                      type="text"
                      id={field}
                      className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      placeholder={`Enter your ${field}`}
                    />
                  </div>
                ))}
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
        </>
      )}
    </div>
  );
};

export default EventDetails;
