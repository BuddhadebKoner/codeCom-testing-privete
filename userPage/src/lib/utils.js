export function formatDateToIST(dateString) {
   // Parse the input date string
   const date = new Date(dateString);

   // Create options for formatting the date and time
   const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
   };

   // Use Intl.DateTimeFormat to format the date in the desired timezone
   const formatter = new Intl.DateTimeFormat("en-GB", options);
   const formattedParts = formatter.formatToParts(date);

   // Extract date and time parts
   const day = formattedParts.find(part => part.type === "day").value;
   const month = formattedParts.find(part => part.type === "month").value.toUpperCase();
   const year = formattedParts.find(part => part.type === "year").value;
   const time = formattedParts
      .filter(part => part.type === "hour" || part.type === "minute" || part.type === "dayPeriod")
      .map(part => part.value)
      .join(" ");

   return `${day} ${month} ${year} ${time}`;
}

// Example usage
const input = "2025-01-02T11:11:00.000+00:00";
// console.log(formatDateToIST(input));
// Output: 2 JAN 2025 4:41 PM



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