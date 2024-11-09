import { NavLink } from "react-router-dom";

const Navbar = () => {
   return (
      <>
         <nav className="bg-white text-black w-full flex justify-start items-center py-5 px-4 border-b-2 border-[#D9D9D9] gap-10">
            <NavLink className="lg:text-2xl font-normal" to="/"> &lt;/&gt; CodeCom </NavLink>
            <div className="flex lg:gap-10 gap-2">
               <NavLink to="/Allevents" className={({ isActive }) => isActive ? 'underline' : ''}>All Events</NavLink>
               <NavLink to="/Addevents" className={({ isActive }) => isActive ? 'underline' : ''}>Add Event</NavLink>
               <NavLink to="/AllTickets" className={({ isActive }) => isActive ? 'underline' : ''}>All Tickets</NavLink>
               <NavLink to="/ClubMembers" className={({ isActive }) => isActive ? 'underline' : ''}>Club Members</NavLink>
            </div>
         </nav>
      </>
   )
}

export default Navbar;
