import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const ViewAllEvents = () => {
  return (
    <div className='w-full h-full '>
      <div className='w-full h-fit flex gap-10'>
        <NavLink
          to="/events/view-all"
          end
          className={({ isActive }) =>
            `font-bold ${isActive ? 'text-blue-500' : 'text-gray-500'}`
          }
        >
          Upcoming Events
        </NavLink>
        <NavLink
          to="/events/view-all/past"
          className={({ isActive }) =>
            `font-bold ${isActive ? 'text-blue-500' : 'text-gray-500'}`
          }
        >
         Hold Events
        </NavLink>
      </div>
      <div className='w-full h-fit flex justify-center items-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default ViewAllEvents
