import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useRefreshEvents } from '../../../lib/react-query/queriesAndMutation'

const ViewAllEvents = () => {

  const {
    mutateAsync: refreshEvents,
    isLoading: isRefreshingEvents,
  } = useRefreshEvents();

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
        {/* refresh data */}
        <button
          className='w-10 h-10 flex justify-center items-center ml-auto'
          onClick={refreshEvents}
          disabled={isRefreshingEvents}>
          <img src="/assets/icons/refresh.svg" alt="refresh-icon" />
        </button>
      </div>
      <div className='w-full h-fit flex justify-center items-center'>
        <Outlet />
      </div>
    </div>
  )
}

export default ViewAllEvents
