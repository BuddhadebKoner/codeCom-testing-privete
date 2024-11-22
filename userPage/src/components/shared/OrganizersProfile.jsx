import React from 'react'
import { Link } from 'react-router-dom'

const OrganizersProfile = ({ organizer }) => {
   // console.log(organizer)
   return (
      <div
         key={organizer.userId}
         className="flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg w-60 transition-all"
      >
         <img
            width={140}
            height={140}
            className="rounded-full border-4 border-gray-500"
            src={organizer.imageUrl}
            alt={organizer.name}
         />
         <h3 className="text-xl text-white font-semibold mt-4">{organizer.name}</h3>
         <p className="text-white text-lg font-normal">{organizer.role}</p>
         <Link
            to={`/profile/${organizer.$id}`}
            className="mt-4 px-6 py-2 text-white font-semibold border-2  transition-all">
            See more
         </Link>
      </div>
   )
}

export default OrganizersProfile
