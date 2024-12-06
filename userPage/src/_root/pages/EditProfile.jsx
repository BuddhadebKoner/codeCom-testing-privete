import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import NotFound from './NotFound';
import { useUpdateProfile } from '../../lib/react-query/queriesAndMutation';
import { useNavigate, useParams } from 'react-router-dom';
import BigLoader from '../../components/shared/BigLoader';
import { toast } from 'react-toastify';

const EditProfile = () => {
  const { user, isAuthenticated, isLoading, checkAuthUser } = useAuth();
  const { mutateAsync: updateProfile, isPending: isUpdateLoading } = useUpdateProfile();
  const navigate = useNavigate();
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    userId: user?.$id || '',
    name: user?.name || '',
    city: user?.city || '',
    linkedin: user?.linkedin || '',
    x: user?.x || '',
    aboutMe: user?.aboutMe || '',
    imageUrl: user?.imageUrl || '',
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!user || !isAuthenticated || user.$id !== userId) {
      navigate('/not-found'); // Redirect if the user isn't authenticated or authorized
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

  const handleFormSubmit = async () => {
    if (!formData.name) {
      toast.warn("Name required");
      return;
    }

    const updatedProfile = { ...formData, imageFile };

    try {
      await updateProfile(updatedProfile);
      toast.success("Profile updated successfully!");
      checkAuthUser();
      navigate(`/profile/${userId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
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
    <div className="w-full max-w-lg mx-auto p-6">
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
        {["name", "city", "linkedin", "x", "aboutMe"].map((field, idx) => (
          <div key={idx} className="mb-4">
            <label
              htmlFor={field}
              className="block text-sm font-medium text-white mb-2 capitalize"
            >
              {field === "x" ? "Twitter" : field}
            </label>
            {field === "aboutMe" ? (
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
              />
            ) : (
              <input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
        <button
          onClick={handleFormSubmit}
          disabled={isUpdateLoading}
          className={`px-6 py-2 rounded-lg text-white ${isUpdateLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
        >
          {isUpdateLoading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
