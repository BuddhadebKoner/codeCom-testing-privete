import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/shared/Loader";
import { getEventById } from "../../lib/appwrite/api";

const EventDetails = () => {
  // Get event id from the URL
  // const { id } = useParams();


  // const [event, setEvent] = useState(null);

  // const handelEvent = async () => {
  //   try {
  //     const event = await getEventById(id);
  //     setEvent(event);
  //     console.log("Event fetched by id:", event);
  //   } catch (error) {
  //     console.error("Error fetching event by id:", error);
  //   }
  // };

  // useEffect(() => {
  //   handelEvent();
  // }, []);

  // example data 
  const event = {
    "eventId": "6731a9eb001cf349be87-1731308011463",
    "title": "this is the tile of first event",
    "desc": " hibro",
    "eventTime": "2024-11-15T03:04:00.000+00:00",
    "eventPlace": "Sanaka Educational Trust's Group of Institutions",
    "locationUrl": "https://maps.app.goo.gl/4KpToFAXnkF6tbKk7",
    "isActive": false,
    "maxCapacity": 50,
    "imageUrl": "https://cloud.appwrite.io/v1/storage/buckets/672fab37002c43b391b0/files/6731a9eb001d040d6453/preview?width=2000&height=2000&gravity=top&quality=50&project=6726244600272c4dd73b&width=2000&height=2000&gravity=top&quality=50&project=6726244600272c4dd73b",
    "imageId": "6731a9eb001d040d6453",
    "subtitle": "Building Stronger Connections: Discover the Leaders Behind the Vision",
    "city": "Malandighi, Durgapur",
    "eventLength": 3,
    "$id": "6731a9ec002e8d177b15",
    "$createdAt": "2024-11-11T06:53:33.148+00:00",
    "$updatedAt": "2024-11-11T06:53:33.148+00:00",
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
  const eventDate = new Date(event.eventTime);
  const timeString = eventDate.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const endTime = new Date(event.eventTime);
  endTime.setHours(eventDate.getHours() + event.eventLength);

  const endTimeString = endTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const timezoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;



  return (
    <>
      <div className="w-full h-full">
        <img
          className="w-full max-h-[500px] object-cover rounded-lg"
          src={event.imageUrl}
          alt={event.title} />
        <div className="w-full h-fit flex flex-col py-10 px-3">
          <h1 className="text-2xl font-semibold">{event.title}</h1>
          <p className="text-xl">{event.subtitle}</p>
          <p className="text-xl font-semibold mt-10">{event.eventPlace},{event.city}</p>
        </div>
        <div className="w-full h-fit bg-white px-5 py-2">
          {/* date and time */}
          <p className="text-black text-xl font-bold">
            {eventDate.toLocaleString('en-US', { month: 'short' })}{' '}
            {eventDate.getDate()},{' '}
            {timeString} – {endTimeString} ({timezoneOffset})
          </p>
        </div>
        <div className="w-full h-fit flex flex-col gap-5 mt-20">
          <p className="text-4xl font-normal">About this event</p>
          <p className="text-lg">{event.desc}</p>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
