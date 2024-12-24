import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../context/AuthContext';
import { useUpdateProfile } from '../../lib/react-query/queriesAndMutation';
import BigLoader from './BigLoader';

const EditProfile = ({ closeEditProfile }) => {
   const { user, isAuthenticated, isLoading, checkAuthUser } = useAuth();
   const { mutateAsync: updateProfile, isPending: isUpdateLoading } = useUpdateProfile();
   const navigate = useNavigate();
   const { userId } = useParams();

   const initialFormData = {
      userId: user?.$id || '',
      name: user?.name || '',
      city: user?.city || '',
      linkedin: user?.linkedin || '',
      x: user?.x || '',
      aboutMe: user?.aboutMe || '',
      imageUrl: user?.imageUrl || '/placeholder.jpg',
   };

   const [formData, setFormData] = useState(initialFormData);
   const [imageFile, setImageFile] = useState(null);

   useEffect(() => {
      if (!user || !isAuthenticated || user.$id !== userId) {
         navigate('/not-found');
      }
   }, [user, isAuthenticated, userId, navigate]);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setImageFile(file);
         const reader = new FileReader();
         reader.onloadend = () => {
            setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
         };
         reader.readAsDataURL(file);
      }
   };

   const validateImage = async () => {
      if (imageFile) {
         const img = new Image();
         img.src = formData.imageUrl;
         return new Promise((resolve, reject) => {
            img.onload = () => {
               if (img.width !== img.height) {
                  toast.warn('Image should be square. Please crop and try again.');
                  reject();
               }
               if (imageFile.size > 1024 * 1024) {
                  toast.warn('Image size should be less than 1MB. Please compress and try again.');
                  reject();
               }
               resolve();
            };
            img.onerror = () => {
               toast.error('Invalid image file.');
               reject();
            };
         });
      }
      return Promise.resolve();
   };

   const handleFormSubmit = async () => {
      // Check if no changes were made
      if (JSON.stringify(formData) === JSON.stringify(initialFormData) && !imageFile) {
         toast.info('No changes made to the profile.');
         return;
      }

      // Validate inputs
      if (!formData.name) {
         toast.warn('Name is required');
         return;
      }

      try {
         await validateImage();
         const updatedProfile = { ...formData, imageFile };
         await updateProfile(updatedProfile);
         toast.success('Profile updated successfully!');
         closeEditProfile();
         checkAuthUser();
         navigate(`/profile/${userId}`);
      } catch (error) {
         toast.error(error?.response?.data?.message || 'Failed to update profile. Please try again.');
      }
   };

   if (isLoading || isUpdateLoading) {
      return (
         <div className="w-full h-fit flex items-center justify-center">
            <BigLoader />
         </div>
      );
   }

   return (
      <>
         <Helmet>
            <meta charSet="utf-8" />
            <title>Edit Profile - {user?.name}</title>
         </Helmet>
         <div className="w-full max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
               <label htmlFor="imageUpload" className="cursor-pointer">
                  <img
                     src={formData.imageUrl}
                     alt="Profile"
                     className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                  />
               </label>
               <input
                  type="file"
                  id="imageUpload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
               />
            </div>

            <div className="mt-6">
               <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     value={formData.name}
                     onChange={handleInputChange}
                     className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-white mb-2">City</label>
                  <input
                     type="text"
                     id="city"
                     name="city"
                     value={formData.city}
                     onChange={handleInputChange}
                     className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="linkedin" className="block text-sm font-medium text-white mb-2">LinkedIn</label>
                  <input
                     type="text"
                     id="linkedin"
                     name="linkedin"
                     value={formData.linkedin}
                     onChange={handleInputChange}
                     className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="x" className="block text-sm font-medium text-white mb-2">Twitter</label>
                  <input
                     type="text"
                     id="x"
                     name="x"
                     value={formData.x}
                     onChange={handleInputChange}
                     className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
                  />
               </div>

               <div className="mb-4">
                  <label htmlFor="aboutMe" className="block text-sm font-medium text-white mb-2">About Me</label>
                  <textarea
                     id="aboutMe"
                     name="aboutMe"
                     value={formData.aboutMe}
                     onChange={handleInputChange}
                     rows="4"
                     className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
                  />
               </div>
            </div>

            <div className="flex justify-between mt-6">
               <button
                  className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
                  onClick={closeEditProfile}
               >
                  Cancel
               </button>
               <button
                  onClick={handleFormSubmit}
                  disabled={isUpdateLoading}
                  className={`px-6 py-2 rounded-lg text-white ${isUpdateLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
               >
                  {isUpdateLoading ? 'Updating...' : 'Update Profile'}
               </button>
            </div>
         </div>
      </>
   );
};

export default EditProfile;
