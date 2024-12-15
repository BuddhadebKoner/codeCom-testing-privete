import React from 'react';
import { useLocation } from 'react-router-dom';
import CreateEventForms from '../../../components/Forms/CreateEventForms';

const EditEvents = () => {
  const location = useLocation();
  const eventData = location.state?.eventData;

  return eventData ? (
    <CreateEventForms action="Update" formData={eventData} />
  ) : (
    <p>No event data available. Please try again.</p>
  );
};

export default EditEvents;
