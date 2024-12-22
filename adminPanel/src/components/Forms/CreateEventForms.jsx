import React, { useEffect, useMemo, useState } from 'react';
import { useAddEvent, useFindUserByEmail, useUpdateEvent } from '../../lib/react-query/queriesAndMutation';
import BigLoader from '../shared/BigLoader';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const formatDateForInput = (isoString) => {
   if (!isoString) return "";
   return isoString.slice(0, 16);
};

const CreateEventForms = ({ formData }) => {
   const { mutate: findUser, isLoading } = useFindUserByEmail();
   const { mutateAsyn: addEvent, isLoading: isAddingEvent } = useAddEvent();
   const [formState, setFormState] = useState(() => ({
      title: formData?.title || "",
      organizers: formData?.organizers || "",
      eventTime: formatDateForInput(formData?.eventTime) || "",
      registerationEndsAt: formatDateForInput(formData?.registerationEndsAt) || "",
      banner: formData?.banner || null,
   }));
   const [preview, setPreview] = useState(null);
   const [showPopup, setShowPopup] = useState(false);
   const [email, setEmail] = useState("");
   const [userName, setUserName] = useState("");
   const [userId, setUserId] = useState("");
   const [error, setError] = useState("");

   const navigate = useNavigate();

   if (isAddingEvent) {
      return (
         <div className="fixed text-gray-200 flex items-center justify-center z-50">
            <BigLoader />
         </div>
      );
   }

   const togglePopup = () => {
      document.body.style.overflow = showPopup ? "auto" : "hidden";
      setShowPopup(!showPopup);
   };

   const onClose = () => {
      document.body.style.overflow = "auto";
      setShowPopup(false);
   };

   const handleSearch = () => {
      setError("");
      setUserName("");
      setUserId("");

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
         setError("Please enter a valid email.");
         return;
      }

      findUser(email, {
         onSuccess: (user) => {
            if (user) {
               setUserName(user.name);
               setUserId(user.$id);
            } else {
               setError("No user found with this email.");
            }
         },
         onError: (error) => {
            setError("An error occurred while searching for the user.");
            console.error("Error:", error);
         },
      });
   };

   const handleChange = (e) => {
      const { name, value, files } = e.target;

      if (name === 'banner' && files[0]) {
         const file = files[0] || null;
         setPreview(URL.createObjectURL(file));
         setFormState((prevData) => ({
            ...prevData,
            [name]: file,
         }));
      } else {
         setFormState((prevData) => ({
            ...prevData,
            [name]: value,
         }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {

         const res = await addEvent(formState);
         console.log("Add Event Response:", res);
         toast.success("Event created successfully.");
         navigate(-1);
      } catch (error) {
         console.error("Error during event creation:", error);
         toast.error(error.message || "An error occurred. Please try again.");
      } finally {
         setFormState({});
         setPreview(null);
      }
   };

   return (
      <>
         {showPopup && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50">
               <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
                  <h1 className="text-xl font-semibold mb-4">Search User</h1>
                  <div className="flex items-center gap-2">
                     <input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border  rounded-lg p-2 flex-grow"
                     />
                     <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600"
                        disabled={isLoading}
                     >
                        GO
                     </button>
                  </div>
                  {isLoading && <p className="text-gray-500 mt-2">Searching...</p>}
                  {error && <p className="text-red-500 mt-2">{error}</p>}
                  {userName && (
                     <div className="mt-4 border-t border-gray-200 pt-4">
                        <p className="font-bold text-lg">{userName}</p>
                        <p className="text-gray-500">{userId}</p>
                     </div>
                  )}
                  <button
                     onClick={onClose}
                     className="mt-6 bg-gray-200 p-2 rounded-lg w-full hover:bg-gray-300"
                  >
                     Close
                  </button>
               </div>
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-6">
            <button
               className='text-xl font-bold flex gap-2 text-white'>
               <img
                  onClick={(e) => {
                     // prevent default
                     e.preventDefault();
                     navigate(-1)
                  }}
                  src="/assets/icons/arrow_back.svg"
                  alt="arrow-back" />
               Create Event
            </button>
            {/* enter organizers ids comma separate */}
            <div>
               <label className="block text-white font-medium">Organizers Profile Id</label>
               <div className='flex justify-center items-center gap-5'>
                  <input
                     type="text"
                     name="organizers"
                     value={formState.organizers}
                     onChange={handleChange}
                     required
                     placeholder="Enter organizers IDs comma separated"
                     className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                  />
                  <p
                     onClick={togglePopup}
                  >
                     <img
                        width={30}
                        height={30}
                        src="/assets/icons/search.svg"
                        alt="search-icon" />
                  </p>
               </div>
            </div>
            {/* Event Title */}
            <div>
               <label className="block text-white font-medium">Event Title</label>
               <input
                  type="text"
                  name="title"
                  value={formState.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter event title"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>

            {/* Subtitle */}
            <div>
               <label className="block text-white font-medium">Subtitle</label>
               <input
                  type="text"
                  name="subtitle"
                  value={formState.subtitle}
                  onChange={handleChange}
                  required
                  placeholder="Enter event subtitle"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>

            {/* Description */}
            <div>
               <label className="block text-white font-medium">Event Description</label>
               <textarea
                  name="desc"
                  value={formState.desc}
                  onChange={handleChange}
                  required
                  placeholder="Enter event description"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               ></textarea>
            </div>

            {/* Event Time */}
            <div>
               <label className="block text-white font-medium">Event Time</label>
               <input
                  type="datetime-local"
                  name="eventTime"
                  value={formState.eventTime}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>

            {/* Registration End Time */}
            <div>
               <label className="block text-white font-medium">Registration Ends At</label>
               <input
                  type="datetime-local"
                  name="registerationEndsAt"
                  value={formState.registerationEndsAt}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>

            {/* Event Length */}
            <div>
               <label className="block text-white font-medium">Event Length (in hours)</label>
               <input
                  type="text"
                  name="eventLength"
                  value={formState.eventLength}
                  onChange={handleChange}
                  placeholder="Event Length in hours"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>
            {/* max Capacity */}
            <div>
               <label className="block text-white font-medium">max Capacity</label>
               <input
                  type="text"
                  name="maxCapacity"
                  value={formState.maxCapacity}
                  onChange={handleChange}
                  placeholder="Maximum Capacity"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>
            {/* Event Place */}
            <div>
               <label className="block text-white font-medium">Event Place</label>
               <input
                  type="text"
                  name="eventPlace"
                  value={formState.eventPlace}
                  onChange={handleChange}
                  required
                  placeholder="Enter event place"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>

            {/* City */}
            <div>
               <label className="block text-white font-medium">City</label>
               <input
                  type="text"
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                  required
                  placeholder="Enter city"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>

            {/* venue */}
            <div>
               <label className="block text-white font-medium">Venue</label>
               <input
                  type="text"
                  name="venue"
                  value={formState.venue}
                  onChange={handleChange}
                  required
                  placeholder="Enter venue"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>

            {/* Location URL */}
            <div>
               <label className="block text-white font-medium">Location URL</label>
               <input
                  type="url"
                  name="locationUrl"
                  value={formState.locationUrl}
                  onChange={handleChange}
                  required
                  placeholder="Enter event location URL"
                  className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
               />
            </div>
            {/* event banner */}
            <label className="block text-white font-medium">Event Banner</label>
            <input
               type="file"
               name="banner"
               onChange={handleChange}
               accept="image/*"
               className="mt-1 w-full px-4 py-2 border  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            <div className="mt-2">
               {preview ? (
                  <img
                     src={preview}
                     alt="Banner Preview"
                     className="w-full h-64 object-cover rounded-md"
                  />
               ) : (
                  formState.imageUrl && (
                     <img
                        src={formState.imageUrl}
                        alt="Existing Banner"
                        className="w-full h-64 object-cover rounded-md"
                     />
                  )
               )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
               <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
               >
                  Create Event
               </button>
            </div>
         </form>
      </>
   );
};

export default CreateEventForms;
