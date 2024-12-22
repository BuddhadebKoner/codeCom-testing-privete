import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BigLoader from "../../components/shared/BigLoader";
import OrganizersProfile from "../../components/shared/OrganizersProfile";
import { useEventById, useGenerateEntryPass } from "../../lib/react-query/queriesAndMutation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import TicketGenerateForm from "../../components/shared/TicketGenerateForm";
import { initialFormState } from "../../lib/utils";
import RegisterBtn from "../../components/shared/RegisterBtn";
import { Helmet } from "react-helmet";
import ImagePopup from "../../components/popup/ImagePopup";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading: isPending } = useEventById(id || "");
  const { isLoading } = useAuth();

  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState(initialFormState);

  // Handle image popup
  const handleImageClick = (url) => {
    setPopupImage(url);
    setShowImagePopup(true);
    document.body.style.overflow = "hidden";
  };

  const closeImagePopup = () => {
    setPopupImage(null);
    setShowImagePopup(false);
    document.body.style.overflow = "auto";
  };

  // Handle registration popup
  const toggleRegisterPopup = () => {
    setShowRegisterPopup((prev) => !prev);
    document.body.style.overflow = showRegisterPopup ? "auto" : "hidden";

    if (!showRegisterPopup) {
      setRegisterForm(initialFormState);
    }
  };

  if (isPending || formLoading || isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-10">
        <BigLoader />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{event?.title}</title>
      </Helmet>
      <div className="w-full h-full text-white">
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
            <RegisterBtn event={event} togglePopup={toggleRegisterPopup} />
          </div>
          <p className="text-xl font-semibold mt-10">
            {event?.eventPlace || "Event Place"}, {event?.city || "City"}
          </p>
        </div>
        <div className="bg-white px-5 py-2">
          <p className="text-black text-xl font-bold flex justify-between">
            {new Date(event?.eventTime).toLocaleString("en-IN")}
          </p>
        </div>
        <section className="my-16">
          <h2 className="text-4xl mb-4">About this event</h2>
          <p>{event?.desc || "No description available."}</p>
        </section>
        <section className="my-16 text-center">
          <h1 className="text-5xl mb-12">Organizers</h1>
          <div className="flex flex-wrap justify-evenly gap-8">
            {event?.organizers?.length ? (
              event.organizers.map((organizer) => (
                <OrganizersProfile key={organizer.$id} organizer={organizer} />
              ))
            ) : (
              <p>No organizers available.</p>
            )}
          </div>
        </section>
        <section className="my-16">
          {event?.pptUrl && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">Presentation</h2>
              <a
                href={event.pptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View or Download Event Presentation
              </a>
            </div>
          )}
          {event?.imageURLs?.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Event Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {event.imageURLs.map((url, index) => (
                  <img
                    key={index}
                    className="w-full object-cover rounded-lg shadow-md cursor-pointer"
                    src={url}
                    alt={`Event Image ${index + 1}`}
                    onClick={() => handleImageClick(url)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Image Popup */}
        {showImagePopup && (
          <ImagePopup imageUrl={popupImage} onClose={closeImagePopup} />
        )}

        {/* Register Popup */}
        {showRegisterPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-[90%] max-w-[500px] rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-black">
                Register for Event
              </h2>
              <TicketGenerateForm
                togglePopup={toggleRegisterPopup}
                setFormLoading={setFormLoading}
                setRegisterForm={setRegisterForm}
                registerForm={registerForm}
                eventId={event.$id}
                registerationEndsAt={event.registerationEndsAt}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventDetails;
