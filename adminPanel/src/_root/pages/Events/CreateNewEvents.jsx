import React from 'react'
import CreateEventForms from '../../../components/Forms/CreateEventForms'

const CreateNewEvents = () => {
  const formData = {
    title: '',
    desc: '',
    subtitle: '',
    eventTime: '',
    registerationEndsAt: '',
    maxCapacity: '',
    eventLength: '',
    eventPlace: '',
    city: '',
    locationUrl: '',
    imageUrl: '',
  }
  
  return (
    <>
      <CreateEventForms
        action="Create"
        formData={formData}
      />
    </>
  )
}

export default CreateNewEvents
