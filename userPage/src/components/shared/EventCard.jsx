import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = () => {


   const event = {
      "eventId": "672fb21d0036e51bc136-1731179037878",
      "title": "this is the tile of first event",
      "desc": "hi bro",
      "eventTime": "2024-11-22T03:04:00.000+00:00",
      "eventPlace": "sanaka educational trust",
      "locationUrl": "https://maps.app.goo.gl/4KpToFAXnkF6tbKk7",
      "isActive": false,
      "maxCapacity": 20,
      "imageUrl": "https://cloud.appwrite.io/v1/storage/buckets/672fab37002c43b391b0/files/672fb21d0036f0623f97/preview?width=2000&height=2000&gravity=top&quality=50&project=6726244600272c4dd73b&width=2000&height=2000&gravity=top&quality=50&project=6726244600272c4dd73b",
      "imageId": "672fb21d0036f0623f97",
      "$id": "672fb21f00079db6b24e",
      "$createdAt": "2024-11-09T19:03:59.521+00:00",
      "$updatedAt": "2024-11-09T19:03:59.521+00:00",
      "$permissions": [
         "read(\"user:672f0eb300054d1e6116\")",
         "update(\"user:672f0eb300054d1e6116\")",
         "delete(\"user:672f0eb300054d1e6116\")"
      ],
      "entryPass": [],
      "organizers": [
         {
            "userId": "672f0eb300054d1e6116",
            "name": "Buddhadeb Koner",
            "email": "buddhadeb@gmail.com",
            "imageId": null,
            "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Buddhadeb+Koner&project=6726244600272c4dd73b&name=Buddhadeb+Koner&project=6726244600272c4dd73b",
            "Linkedin": null,
            "instagram": null,
            "isAdmin": true,
            "role": "tech-lead",
            "$id": "672f0eb40001247aa36b",
            "$createdAt": "2024-11-09T07:26:44.545+00:00",
            "$updatedAt": "2024-11-09T08:06:05.311+00:00",
            "$permissions": [
               "read(\"user:672f0e4b001dc6d0fea5\")",
               "update(\"user:672f0e4b001dc6d0fea5\")",
               "delete(\"user:672f0e4b001dc6d0fea5\")"
            ],
            "entryPass": [],
            "$databaseId": "672624ee00287d736782",
            "$collectionId": "672a512300298fad5cf4"
         }
      ],
      "$databaseId": "672624ee00287d736782",
      "$collectionId": "672a523500237ab87342"
   }

   return (
      <div className="flex items-center flex-col max-w-sm rounded-lg overflow-hidden shadow-lg bg-white p-4">
         <img
            className="max-h-[200px] max-w-[200px] object-cover rounded-full"
            src={event.imageUrl} alt="event-banner"
         />
         <div className="mt-10 flex flex-col gap-3">
            <Link
               to={`/event/${event.eventId}`}
               className="text-xl font-semibold text-gray-800 underline"
            >
               {event.title.replace(/\b\w/g, char => char.toUpperCase())}
            </Link>
            <div className="mt-4 flex justify-between items-center">
               <p className="text-sm text-black">
                  {event.eventPlace
                     .split(' ')
                     .map(word => word[0].toUpperCase())
                     .join('')}
               </p>
               <div className='w-fit flex items-center justify-center gap-2'>
                  <img
                     width={20}
                     src="/assets/calender-logo.svg" alt="event-icon" />
                  <p className="text-sm text-black">{new Date(event.eventTime).toDateString()}</p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default EventCard