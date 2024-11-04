import { Link } from "react-router-dom"

const Navbar = () => {
   return (
      <>
         <nav
            className="bg-white text-black w-full flex justify-between items-center py-5 px-4 border-b-2 border-[#D9D9D9]">
            <Link className="lg:text-2xl font-normal" to={"/"}>&lt;/&gt; CodeCom</Link>
            <div className="flex lg:gap-10 gap-2">
               <Link
               className="lg:text-xl text-sm"
                to={"/about"}>About CodeCom</Link>
               <Link
               className="lg:text-xl text-sm"
                to={"/upcoming-events"}>Upcoming Events</Link>
               <Link
               className="lg:text-xl text-sm"
                to={"/sign-in"}>sign in</Link>
            </div>
         </nav >
      </>
   )
}

export default Navbar