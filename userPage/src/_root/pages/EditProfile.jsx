import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useUpdateProfile } from '../../lib/react-query/queriesAndMutation';
import { useNavigate, useParams } from 'react-router-dom';
import BigLoader from '../../components/shared/BigLoader';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const InputField = ({ id, label, value, onChange, isTextArea = false }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-white mb-2 capitalize">
      {label}
    </label>
    {isTextArea ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
      />
    ) : (
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 focus:ring-2 focus:outline-none text-white"
      />
    )}
  </div>
);

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
    imageUrl: user?.imageUrl || '/placeholder.jpg',
  });

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

  const validateImage = () => {
    if (imageFile) {
      const img = new Image();
      img.src = formData.imageUrl;
      return new Promise((resolve, reject) => {
        img.onload = () => {
          let warningShown = false;
          if (img.width !== img.height) {
            toast.warn("Image should be square. Please crop and try again.");
            warningShown = true;
          }
          if (imageFile.size > 1024 * 1024) {
            toast.warn("Image size should be less than 1MB. Please compress and try again.");
            warningShown = true;
          }
          if (warningShown) {
            reject();
          } else {
            resolve();
          }
        };
      });
    }
    return Promise.resolve();
  };

  const handleFormSubmit = async () => {
    if (!formData.name) {
      toast.warn("Name is required");
      return;
    }

    try {
      await validateImage();
      const updatedProfile = { ...formData, imageFile };
      await updateProfile(updatedProfile);
      toast.success("Profile updated successfully!");
      checkAuthUser();
      navigate(`/profile/${userId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile. Please try again.");
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
          {[
            { id: "name", label: "Name" },
            { id: "city", label: "City" },
            { id: "linkedin", label: "LinkedIn" },
            { id: "x", label: "Twitter" },
            { id: "aboutMe", label: "About Me", isTextArea: true },
          ].map(({ id, label, isTextArea }) => (
            <InputField
              key={id}
              id={id}
              label={label}
              value={formData[id]}
              onChange={handleInputChange}
              isTextArea={isTextArea}
            />
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
            className={`px-6 py-2 rounded-lg text-white ${isUpdateLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {isUpdateLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
