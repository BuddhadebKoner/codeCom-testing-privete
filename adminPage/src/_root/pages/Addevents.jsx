import React, { useEffect, useState } from 'react';
import { addEvent, findUserByEmail } from '../../lib/appwrite/api';
import { useNavigate } from 'react-router-dom';

const Addevents = () => {
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    eventTime: '',
    eventPlace: '',
    locationUrl: '',
    eventOrganizer: [],
    maxCapacity: 0,
  });

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOrganizer, setSelectedOrganizer] = useState({});


  useEffect(() => {
    console.log('Selected Organizer:', selectedOrganizer);
  }, [selectedOrganizer]);

  // Handle search
  const handleSearch = async () => {
    try {
      const searchUserByEmail = await findUserByEmail(searchTerm);
      console.log('Search results:', searchUserByEmail);
      setSearchResults(searchUserByEmail ? [searchUserByEmail] : []);
    } catch (error) {
      console.error('Error finding user:', error);
      setSearchResults([]);
    }
  };

  // Handle selecting an organizer
  const handleSelectOrganizer = (organizer) => {
    // Prevent adding the same organizer multiple times
    if (!selectedOrganizer[organizer.id]) {
      const newSelectedOrganizer = { ...selectedOrganizer, [organizer.$id]: organizer.email };

      setSelectedOrganizer(newSelectedOrganizer);
      console.log('Selected Organizer:', selectedOrganizer);

      // Add userId to the eventOrganizer array in formData
      setFormData((prevData) => ({
        ...prevData,
        eventOrganizer: [...prevData.eventOrganizer, organizer.id],
      }));
    }

    // Clear search term and reset search results
    setSearchTerm('');
    setSearchResults([]);
  };

  // Handle removing an organizer from the selected list
  const handleRemoveOrganizer = (id) => {
    const newSelectedOrganizer = { ...selectedOrganizer };
    delete newSelectedOrganizer[id];
    setSelectedOrganizer(newSelectedOrganizer);

    // Remove the userId from the eventOrganizer array in formData
    setFormData((prevData) => ({
      ...prevData,
      eventOrganizer: prevData.eventOrganizer.filter((organizerId) => organizerId !== id),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "maxCapacity" ? parseInt(value, 10) || 0 : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // extract id key from selectedOrganizer object, to a array organizers
    const organizers = Object.keys(selectedOrganizer);

    const event = {
      title: formData.title,
      desc: formData.desc,
      eventTime: formData.eventTime,
      eventPlace: formData.eventPlace,
      maxCapacity: parseInt(formData.maxCapacity, 10),
      locationUrl: formData.locationUrl,
      organizers,
    };

    try {
      const addingEvent = await addEvent(event);
      if (addingEvent) {
        navigate('/Allevents');
        console.log('Event added:', addingEvent);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };



  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Event</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium">Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required
            placeholder='Event Title'
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description:</label>
          <textarea name="desc" value={formData.desc} onChange={handleChange} required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"></textarea>
        </div>

        {/* Event Time */}
        <div>
          <label className="block text-gray-700 font-medium">Event Time:</label>
          <input type="datetime-local" name="eventTime" value={formData.eventTime} onChange={handleChange} required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black" />
        </div>

        {/* Event Place */}
        <div>
          <label className="block text-gray-700 font-medium">Event Place:</label>
          <input type="text" name="eventPlace" value={formData.eventPlace} onChange={handleChange} required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black" />
        </div>

        {/* Location URL */}
        <div>
          <label className="block text-gray-700 font-medium">Location URL:</label>
          <input type="url" name="locationUrl" value={formData.locationUrl} onChange={handleChange} required
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black" />
        </div>

        {/* Organizer Search and Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Search User</label>
          <input
            type="text"
            placeholder="Type user email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
          />

          {/* "Go" button to trigger the search */}
          <button
            type="button"
            onClick={handleSearch}
            className="mt-2 w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Go
          </button>

          {/* Display search results */}
          {searchTerm && searchResults.length > 0 && (
            <ul className="mt-2 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto shadow-md">
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  onClick={() => handleSelectOrganizer(result)}
                  className="px-4 py-2 cursor-pointer text-black hover:bg-indigo-100"
                >
                  {result.name}
                </li>
              ))}
            </ul>
          )}

          {/* Optional: Message for no results */}
          {searchTerm && searchResults.length === 0 && (
            <p className="mt-2 text-sm text-gray-500">No user found.</p>
          )}

          {/* Display selected organizer as a tag */}
          {Object.keys(selectedOrganizer).length > 0 && (
            <div className="mt-4 flex items-center gap-2">
              {Object.entries(selectedOrganizer).map(([userId, name]) => (
                <span
                  key={userId}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full flex items-center space-x-2"
                >
                  <span>{name}</span>
                  <button
                    onClick={() => handleRemoveOrganizer(userId)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Max Capacity */}
        <div>
          <label className="block text-gray-700 font-medium">Max Capacity:</label>
          <input type="number" name="maxCapacity" value={formData.maxCapacity} onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black" />
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add Event</button>
      </form>
    </div>
  );
};

export default Addevents;
