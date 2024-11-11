import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById } from "../../lib/appwrite/api";
import BigLoader from "../../components/shared/BigLoader";
import OrganizersProfile from "../../components/shared/OrganizersProfile";
import { useEventById } from "../../lib/react-query/queriesAndMutation";

const EventDetails = () => {
  // Get event id from the URL
  const { id } = useParams();

  const { data: event, isPending } = useEventById(id || '');

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

  // const event = {
  //   "eventId": "6730d9f4003c9154a41b-1731254772969",
  //   "title": "Know your Lead",
  //   "desc": "Join us for an insightful event where you'll get the chance to meet and learn more about the leaders driving our mission forward. \"Know Your Lead\" is designed to foster open dialogue, share leadership experiences, and deepen the connection between teams and their leaders. Whether you're curious about leadership styles, decision-making processes, or simply want to know the people at the helm, this event is your opportunity to connect, ask questions, and be inspired.",
  //   "eventTime": "2024-04-10T04:05:00.000+00:00",
  //   "eventPlace": "sanaka educational trust",
  //   "locationUrl": "https://maps.app.goo.gl/4KpToFAXnkF6tbKk7",
  //   "isActive": false,
  //   "maxCapacity": 100,
  //   "imageUrl": "https://cloud.appwrite.io/v1/storage/buckets/672fab37002c43b391b0/files/6730d9f4003c9bc12abf/preview?width=2000&height=2000&gravity=top&quality=50&project=6726244600272c4dd73b&width=2000&height=2000&gravity=top&quality=50&project=6726244600272c4dd73b",
  //   "imageId": "6730d9f4003c9bc12abf",
  //   "subtitle": "Building Stronger Connections: Discover the Leaders Behind the Vision",
  //   "city": null,
  //   "eventLength": null,
  //   "$id": "6730d9f9003c563dd734",
  //   "$createdAt": "2024-11-10T16:06:19.410+00:00",
  //   "$updatedAt": "2024-11-10T16:27:50.476+00:00",
  //   "$permissions": [
  //     "read(\"user:672f0eb300054d1e6116\")",
  //     "update(\"user:672f0eb300054d1e6116\")",
  //     "delete(\"user:672f0eb300054d1e6116\")"
  //   ],
  //   "entryPass": [],
  //   "organizers": [
  //     {
  //       "userId": "672f0f3d000f0b103423",
  //       "name": "Gourab ganguli",
  //       "email": "gourab@gmail.com",
  //       "imageId": null,
  //       "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Gourab+ganguli&project=6726244600272c4dd73b&name=Gourab+ganguli&project=6726244600272c4dd73b",
  //       "Linkedin": null,
  //       "instagram": null,
  //       "isAdmin": false,
  //       "role": "web-dev-lead",
  //       "$id": "672f0f3e002708ddc70e",
  //       "$createdAt": "2024-11-09T07:29:03.145+00:00",
  //       "$updatedAt": "2024-11-09T08:05:27.420+00:00",
  //       "$permissions": [
  //         "read(\"user:672f0e4b001dc6d0fea5\")",
  //         "update(\"user:672f0e4b001dc6d0fea5\")",
  //         "delete(\"user:672f0e4b001dc6d0fea5\")"
  //       ],
  //       "entryPass": [],
  //       "$databaseId": "672624ee00287d736782",
  //       "$collectionId": "672a512300298fad5cf4"
  //     },
  //     {
  //       "userId": "672f0f3d000f0b103423",
  //       "name": "Gourab ganguli",
  //       "email": "gourab@gmail.com",
  //       "imageId": null,
  //       "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Gourab+ganguli&project=6726244600272c4dd73b&name=Gourab+ganguli&project=6726244600272c4dd73b",
  //       "Linkedin": null,
  //       "instagram": null,
  //       "isAdmin": false,
  //       "role": "web-dev-lead",
  //       "$id": "672f0f3e002708ddc70e",
  //       "$createdAt": "2024-11-09T07:29:03.145+00:00",
  //       "$updatedAt": "2024-11-09T08:05:27.420+00:00",
  //       "$permissions": [
  //         "read(\"user:672f0e4b001dc6d0fea5\")",
  //         "update(\"user:672f0e4b001dc6d0fea5\")",
  //         "delete(\"user:672f0e4b001dc6d0fea5\")"
  //       ],
  //       "entryPass": [],
  //       "$databaseId": "672624ee00287d736782",
  //       "$collectionId": "672a512300298fad5cf4"
  //     },
  //     {
  //       "userId": "672f0f3d000f0b103423",
  //       "name": "Gourab ganguli",
  //       "email": "gourab@gmail.com",
  //       "imageId": null,
  //       "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Gourab+ganguli&project=6726244600272c4dd73b&name=Gourab+ganguli&project=6726244600272c4dd73b",
  //       "Linkedin": null,
  //       "instagram": null,
  //       "isAdmin": false,
  //       "role": "web-dev-lead",
  //       "$id": "672f0f3e002708ddc70e",
  //       "$createdAt": "2024-11-09T07:29:03.145+00:00",
  //       "$updatedAt": "2024-11-09T08:05:27.420+00:00",
  //       "$permissions": [
  //         "read(\"user:672f0e4b001dc6d0fea5\")",
  //         "update(\"user:672f0e4b001dc6d0fea5\")",
  //         "delete(\"user:672f0e4b001dc6d0fea5\")"
  //       ],
  //       "entryPass": [],
  //       "$databaseId": "672624ee00287d736782",
  //       "$collectionId": "672a512300298fad5cf4"
  //     },
  //     {
  //       "userId": "672f0f3d000f0b103423",
  //       "name": "Gourab ganguli",
  //       "email": "gourab@gmail.com",
  //       "imageId": null,
  //       "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Gourab+ganguli&project=6726244600272c4dd73b&name=Gourab+ganguli&project=6726244600272c4dd73b",
  //       "Linkedin": null,
  //       "instagram": null,
  //       "isAdmin": false,
  //       "role": "web-dev-lead",
  //       "$id": "672f0f3e002708ddc70e",
  //       "$createdAt": "2024-11-09T07:29:03.145+00:00",
  //       "$updatedAt": "2024-11-09T08:05:27.420+00:00",
  //       "$permissions": [
  //         "read(\"user:672f0e4b001dc6d0fea5\")",
  //         "update(\"user:672f0e4b001dc6d0fea5\")",
  //         "delete(\"user:672f0e4b001dc6d0fea5\")"
  //       ],
  //       "entryPass": [],
  //       "$databaseId": "672624ee00287d736782",
  //       "$collectionId": "672a512300298fad5cf4"
  //     },
  //     {
  //       "userId": "672f0f3d000f0b103423",
  //       "name": "Gourab ganguli",
  //       "email": "gourab@gmail.com",
  //       "imageId": null,
  //       "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Gourab+ganguli&project=6726244600272c4dd73b&name=Gourab+ganguli&project=6726244600272c4dd73b",
  //       "Linkedin": null,
  //       "instagram": null,
  //       "isAdmin": false,
  //       "role": "web-dev-lead",
  //       "$id": "672f0f3e002708ddc70e",
  //       "$createdAt": "2024-11-09T07:29:03.145+00:00",
  //       "$updatedAt": "2024-11-09T08:05:27.420+00:00",
  //       "$permissions": [
  //         "read(\"user:672f0e4b001dc6d0fea5\")",
  //         "update(\"user:672f0e4b001dc6d0fea5\")",
  //         "delete(\"user:672f0e4b001dc6d0fea5\")"
  //       ],
  //       "entryPass": [],
  //       "$databaseId": "672624ee00287d736782",
  //       "$collectionId": "672a512300298fad5cf4"
  //     },
  //   ],
  //   "$databaseId": "672624ee00287d736782",
  //   "$collectionId": "672a523500237ab87342"
  // }
  // Fallback for event fields if they are null/undefined

  if (isPending) {
    return (
      <>
        <div className="w-full h-full flex justify-center items-center mt-10">
          <BigLoader />
        </div>
      </>
    );
  }

  // Ensure event fields are defined
  const eventDate = event.eventTime ? new Date(event.eventTime) : null;
  const timeString = eventDate ? eventDate.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) : 'N/A';

  const endTime = event.eventLength ? new Date(event.eventTime) : null;
  if (endTime) {
    endTime.setHours(eventDate.getHours() + event.eventLength);
  }
  const endTimeString = endTime ? endTime.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) : 'N/A';

  const timezoneOffset = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      <div className="w-full h-full">
        <img
          className="w-full max-h-[500px] object-cover rounded-lg"
          src={event.imageUrl || '/default-image.jpg'} // Provide fallback image
          alt={event.title || 'Event Image'}
        />
        <div className="w-full h-fit flex flex-col py-10 px-3">
          <h1 className="text-2xl font-semibold">{event.title || 'Event Title'}</h1>
          <p className="text-xl">{event.subtitle || 'Event Subtitle'}</p>
          <p className="text-xl font-semibold mt-10">
            {event.eventPlace || 'Event Place'}, {event.city || 'City'}
          </p>
        </div>
        <div className="w-full h-fit bg-white px-5 py-2">
          {/* Date and time */}
          <p className="text-black text-xl font-bold">
            {eventDate ? `${eventDate.toLocaleString('en-US', { month: 'short' })} ${eventDate.getDate()}` : 'N/A'},
            {timeString} – {endTimeString} ({timezoneOffset})
          </p>
        </div>
        <div className="w-full h-fit flex flex-col gap-5 mt-[5rem]">
          <p className="text-4xl font-normal">About this event</p>
          <p className="text-lg">{event.desc || 'Event description not available.'}</p>
        </div>
        <div className="w-full h-fit flex items-center flex-col flex-wrap gap-5 mt-[10rem]">
          <h1 className="text-center text-5xl">Organizers</h1>
          <div className="w-full h-fit flex justify-evenly flex-wrap gap-[150px] mt-[5rem]">
            {event.organizers.map((organizer) => (
              <OrganizersProfile
                key={organizer.$id}
                organizer={organizer}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
