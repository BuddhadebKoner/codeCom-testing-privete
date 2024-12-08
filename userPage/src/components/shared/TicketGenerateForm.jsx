import React from 'react'
import { formData } from '../../lib/utils';
import { useGenerateEntryPass } from '../../lib/react-query/queriesAndMutation';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const TicketGenerateForm = (
   { togglePopup, setFormLoading, setRegisterForm, registerForm, eventId }
) => {

   const { mutateAsync: generateEntryPass, isPending } = useGenerateEntryPass();
   const { isAuthenticated, user, isLoading } = useAuth();



   const handleInputChange = (e) => {
      const { id, value } = e.target;
      setRegisterForm((prev) => ({ ...prev, [id]: value }));
   };

   const handleRegisterOnEvent = async (e) => {
      e.preventDefault();
      setFormLoading(true);

      const passData = {
         users: user.$id,
         events: eventId,
         purpose: registerForm.purpose,
         stream: registerForm.stream,
         department: registerForm.department,
         phone: registerForm.phone,
         institute: registerForm.institute,
         year: registerForm.year,
         specialization: registerForm.specialization
      };

      try {
         await generateEntryPass(passData);
      } catch (error) {
         console.error("Error registering event:", error);
         toast.error("Error registering event");
      } finally {
         setFormLoading(false);
         togglePopup();
         toast.success("Registered successfully");
      }
   };


   return (
      <form onSubmit={handleRegisterOnEvent}>
         {/* Purpose Field */}
         <div className="mb-4">
            <label htmlFor="purpose" className="block text-gray-700 font-semibold capitalize">
               Purpose <span className="text-red-400">*</span>
            </label>
            <input
               value={registerForm.purpose}
               onChange={handleInputChange}
               type="text"
               id="purpose"
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
   )
}

export default TicketGenerateForm