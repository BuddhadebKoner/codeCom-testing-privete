import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BigLoader from "../../components/shared/BigLoader";
import OrganizersProfile from "../../components/shared/OrganizersProfile";
import { useEventById, useGenerateEntryPass } from "../../lib/react-query/queriesAndMutation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { formData } from "../../_data/basicData";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isPending } = useEventById(id || "");
  const { mutateAsync: generateEntryPass } = useGenerateEntryPass();
  const { isAuthenticated, user } = useAuth();

  const navigate = useNavigate();

  const [formLoading, setFormLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const initialFormState = {
    purpus: "",
    stream: "",
    department: "",
    phone: "",
    institute: "Sanaka Educational Trust Group Of Institutions",
    year: "",
    specialization: "",
  };

  const [registerForm, setRegisterForm] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegisterOnEvent = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    if (
      !registerForm.purpus ||
      !registerForm.stream ||
      !registerForm.department ||
      !registerForm.phone ||
      !registerForm.institute ||
      !registerForm.year
    ) {
      toast.warn("Please fill all the fields.");
      setFormLoading(false);
      return;
    }

    const passData = {
      users: user.$id,
      events: event.$id,
      ...registerForm,
    };

    try {
      const responce = await generateEntryPass({ passData });
      // console.log("Entry pass generated:", responce);
      toast.success("Successfully registered for the event.");
      togglePopup();
      // redirect to this root /entry-pass/:userId/:eventId:entryId
      if (!user?.$id || !event?.$id || !responce?.entryId) {
        // console.error("Navigation failed: Missing required data.", {
        //   userId: user?.$id,
        //   eventId: event?.$id,
        //   entryId: responce?.entryId,
        // });
        toast.error("Error generating entry pass. Please try again.");
        throw new Error("Missing required data for navigation.");
      }
      // console.log(`Navigating to: /entry-pass/${user.$id}/${event.$id}/${responce.entryId}`);
      toast.success("Wait for the approval of your entry pass.");
      // navigate(`/entry-pass/${user.$id}/${event.$id}/${responce.entryId}`);
    } catch (error) {
      toast.error("Error generating entry pass. Please try");
      console.error("Error generating entry pass:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const togglePopup = () => {
    document.body.style.overflow = showPopup ? "auto" : "hidden";
    setShowPopup(!showPopup);

    if (!showPopup) {
      setRegisterForm(initialFormState);
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
  const formattedTime = eventDate?.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }) || "N/A";

  const endTime = eventDate ? new Date(eventDate) : null;
  if (endTime && event?.eventLength) {
    endTime.setHours(endTime.getHours() + event.eventLength);
  }

  const formattedEndTime = endTime?.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }) || "N/A";

  const timezoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className="w-full h-full">
      <img
        className="w-full max-h-[500px] object-cover rounded-lg"
        src={event?.imageUrl || "/default-image.jpg"}
        alt={event?.title || "Event Image"}
      />
      <div className="py-10 px-3">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{event?.title || "Event Title"}</h1>
            <p className="text-xl">{event?.subtitle || "Event Subtitle"}</p>
          </div>

          {
            isAuthenticated ? (
              new Date() > endTime ? (
                <p className="text-red-500">Registration Closed</p>
              ) : event.entryPass.some(
                (entry) => entry.users?.userId === user.userId
              ) ? (
                <p className="text-yellow-300">Wait for approval</p>
              ) : (
                <button
                  onClick={togglePopup}
                  className="w-fit h-fit px-6 py-3 bg-blue-500 text-white rounded-lg small-medium "
                >
                  Register
                </button>
              )
            ) : (
              <Link to="/sign-in" className="text-blue-500 underline">
                Login to Register
              </Link>
            )
          }


        </div>
        <p className="text-xl font-semibold mt-10">
          {event?.eventPlace || "Event Place"}, {event?.city || "City"}
        </p>
      </div>
      <div className="bg-white px-5 py-2">
        <p className="text-black text-xl font-bold">
          {eventDate?.toLocaleString("en-US", { month: "short" })} {eventDate?.getDate()} -{" "}
          {formattedTime} to {formattedEndTime} ({timezoneOffset})
        </p>
      </div>
      <section className="my-16">
        <h2 className="text-4xl mb-4">About this event</h2>
        <p>{event?.desc || "No description available."}</p>
      </section>
      <section className="my-16 text-center">
        <h1 className="text-5xl mb-12">Organizers</h1>
        <div className="flex flex-wrap justify-evenly gap-8">
          {event?.organizers?.map((organizer) => (
            <OrganizersProfile key={organizer.$id} organizer={organizer} />
          )) || <p>No organizers available.</p>}
        </div>
      </section>
      {showPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-8">
              {isAuthenticated ? (
                <>
                  <h2 className="text-2xl font-bold text-center mb-6 text-black">Register for Event</h2>
                  <form onSubmit={handleRegisterOnEvent}>
                    {/* Purpose Field */}
                    <div className="mb-4">
                      <label htmlFor="purpus" className="block text-gray-700 font-semibold capitalize">
                        Purpose <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={registerForm.purpus}
                        onChange={handleInputChange}
                        type="text"
                        id="purpus"
                        placeholder="Enter your purpose"
                        className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      />
                    </div>

                    {/* Stream Dropdown */}
                    <div className="mb-4">
                      <label htmlFor="stream" className="block text-gray-700 font-semibold capitalize">
                        Stream <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={registerForm.stream}
                        onChange={handleInputChange}
                        id="stream"
                        className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      >
                        <option value="" disabled>Select your stream</option>
                        {formData.stream.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Department Dropdown */}
                    <div className="mb-4">
                      <label htmlFor="department" className="block text-gray-700 font-semibold capitalize">
                        Department <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={registerForm.department}
                        onChange={handleInputChange}
                        id="department"
                        className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      >
                        <option value="" disabled>Select your department</option>
                        {formData.department.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Phone Field */}
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-gray-700 font-semibold capitalize">
                        Phone <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={registerForm.phone}
                        onChange={handleInputChange}
                        type="text"
                        id="phone"
                        placeholder="Enter your phone number"
                        className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      />
                    </div>

                    {/* Institute Field */}
                    <div className="mb-4">
                      <label htmlFor="institute" className="block text-gray-700 font-semibold capitalize">
                        Institute <span className="text-red-400">*</span>
                      </label>
                      <input
                        value={registerForm.institute}
                        onChange={handleInputChange}
                        type="text"
                        id="institute"
                        placeholder="Enter your institute name"
                        className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      />
                    </div>

                    {/* Year Dropdown */}
                    <div className="mb-4">
                      <label htmlFor="year" className="block text-gray-700 font-semibold capitalize">
                        Year <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={registerForm.year}
                        onChange={handleInputChange}
                        id="year"
                        className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      >
                        <option value="" disabled>Select your year</option>
                        {formData.year.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Specialization Field */}
                    <div className="mb-4">
                      <label htmlFor="specialization" className="block text-gray-700 font-semibold capitalize">
                        Specialization
                      </label>
                      <input
                        value={registerForm.specialization}
                        onChange={handleInputChange}
                        type="text"
                        id="specialization"
                        placeholder="Enter your specialization"
                        className="w-full border rounded-lg px-4 py-2 mt-2 focus:outline-none text-black"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                      <button
                        type="button"
                        onClick={togglePopup}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex justify-center items-center">
                  <p className="text-center text-lg">Please login to register for the event.</p>
                  <div className="flex justify-center mt-4">
                    <Link to="/sign-in" className="px-6 py-2 bg-blue-500 text-white rounded-lg">
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;
