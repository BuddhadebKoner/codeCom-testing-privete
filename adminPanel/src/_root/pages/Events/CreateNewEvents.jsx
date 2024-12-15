import React from 'react';
import CreateEventForms from '../../../components/Forms/CreateEventForms';

const CreateNewEvents = () => {
  const formData = {}; // Empty form data for creating a new event

  return (
    <CreateEventForms action="Create" formData={formData} />
  );
};

export default CreateNewEvents;
