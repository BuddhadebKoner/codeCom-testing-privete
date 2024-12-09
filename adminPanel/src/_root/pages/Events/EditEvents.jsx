import React from 'react'
import { useLocation } from 'react-router-dom';
import CreateEventForms from '../../../components/Forms/CreateEventForms';

const EditEvents = () => {
  const location = useLocation();
  const { eventData } = location.state || {};

  if (!eventData) {
    return <p>No event data available.</p>;
  }

  return (
    <>
      <CreateEventForms
        action="Update"
        formData={eventData}
      />
    </>
  )
}

export default EditEvents