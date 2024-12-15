import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { addEventExtraDetails } from '../../../lib/appwrite/api';
import { toast } from 'react-toastify';

const AddExtraDetails = () => {
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const { id } = useParams();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Filter files by size (less than or equal to 1 MB)
    const validImages = files.filter((file) => {
      if (file.size > 1024 * 1024) {
        toast.warn(`"${file.name}" exceeds the size limit of 1 MB.`);
        return false;
      }
      return true;
    });

    if (images.length + validImages.length > 3) {
      toast.error("You can upload a maximum of 3 images.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...validImages]);
    toast.success(`${validImages.length} image(s) added successfully.`);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    toast.info("Image removed.");
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdf(file);
      toast.success("PDF uploaded successfully.");
    } else {
      toast.error("Only PDF files are allowed.");
    }
  };

  const handlePdfRemove = () => {
    setPdf(null);
    toast.info("PDF removed.");
  };

  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("eventId", id);
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });
    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const res = await addEventExtraDetails(formData);
      toast.success("Details added successfully!");
      console.log(res);
    } catch (error) {
      console.error("Error adding extra details:", error);
      toast.error("Failed to add details. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
      <h2 className="text-2xl font-bold text-center mb-6">Add Extra Details</h2>

      {/* Image Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* Image Preview Section */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-32 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PDF Upload Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        {/* PDF Preview Section */}
        {pdf && (
          <div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded-lg border">
            <span className="text-sm text-gray-700">{pdf.name}</span>
            <button
              type="button"
              onClick={handlePdfRemove}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddExtraDetails;
