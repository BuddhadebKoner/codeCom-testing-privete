import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NotFound from './NotFound';
import { useUpdateProfile } from '../../lib/react-query/queriesAndMutation';

const EditProfile = () => {
  const { user, isAuthenticated } = useAuth();
  const { mutateAsync: updateProfile, isPending: isUpdateLoading } = useUpdateProfile();

  const [formData, setFormData] = useState({
    userId: user.$id,
    name: user.name || '',
    city: user.city || '',
    linkedin: user.linkedin || '',
    x: user.x || '',
    aboutMe: user.aboutMe || '',
    imageUrl: user.imageUrl || '',
  });

  const [imageFile, setImageFile] = useState(null);

  if (!isAuthenticated) {
    return <NotFound />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Optional: Preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    if (!formData.name || !formData.city) {
      return alert("Name and City are required fields.");
    }

    const updatedProfile = {
      ...formData,
      imageFile,
    };

    try {
      console.log("Updating profile:", updatedProfile);
      await updateProfile(updatedProfile);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };


  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex flex-col items-center">
        <label htmlFor="imageUpload" className="cursor-pointer">
          <img
            src={formData.imageUrl || '/placeholder.jpg'}
            alt={formData.name}
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            LinkedIn
          </label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="x" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            X (Twitter)
          </label>
          <input
            type="text"
            id="x"
            name="x"
            value={formData.x}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            About Me
          </label>
          <textarea
            id="aboutMe"
            name="aboutMe"
            value={formData.aboutMe}
            onChange={handleInputChange}
            rows="4"
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleFormSubmit}
          disabled={isUpdateLoading}
          className={`px-6 py-2 rounded-lg text-white ${isUpdateLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isUpdateLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
