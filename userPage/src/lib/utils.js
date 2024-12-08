export function formatEventTimeIndian(eventTime) {
   const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
   const optionsTime = { hour: 'numeric', minute: 'numeric', hourCycle: 'h12', timeZone: 'Asia/Kolkata' };

   const eventDate = new Date(eventTime);

   // Format the date part
   const formattedDate = eventDate.toLocaleDateString('en-IN', optionsDate);

   // Format the start time
   const startTime = eventDate.toLocaleTimeString('en-IN', optionsTime);

   // Assuming the event duration is 2 hours for this example
   const endTime = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
      .toLocaleTimeString('en-IN', optionsTime);

   return `${formattedDate}, ${startTime} – ${endTime}`;
}

export const initialFormState = {
   purpose: "",
   stream: "",
   department: "",
   phone: "",
   institute: "Sanaka Educational Trust Group Of Institutions",
   year: "",
   specialization: "",
};

export const formData = {
   department: [
      'CSE',
      'Data Science',
      'AI ML',
      'EE',
      'ECE',
      'EEE',
      'MACHANICAL',
      'CIVIL',
      'others'
   ],
   year: [
      '1st Year',
      '2nd Year',
      '3rd Year',
      '4th Year',
      'others'
   ],
   stream: [
      'B.Tech',
   ]
}