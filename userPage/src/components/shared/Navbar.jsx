import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Navbar = () => {
   const { user, isAuthenticated, isLoading } = useAuth();
   return (
      <>
         <nav
            className="bg-black text-white w-full flex justify-between items-center py-5 px-4 border-b-2 border-[#D9D9D9]">
            <Link className="lg:text-2xl font-normal" to={"/"}>&lt;/&gt; CodeCom</Link>
            <div className="flex justify-center items-center lg:gap-10 gap-2">
               <Link
                  className="lg:text-xl text-sm"
                  to={"/about"}>About CodeCom</Link>
               <Link
                  className="lg:text-xl text-sm"
                  to={"/upcoming-events"}>Upcoming Events</Link>
               {
                  isAuthenticated ? (
                     <img
                        className="rounded-full"
                        width={40}
                        src={user.imageUrl}
                        alt="profile" />
                  ) : isLoading ? (
                        <>
                           <img
                              width={40}
                              src="/loader.svg"
                              alt="loader" />
                        </>
                  ) : (
                     <Link
                        className="lg:text-xl text-sm"
                        to={"/sign-in"}>sign in</Link>
                  )
               }
            </div>
         </nav >
      </>
   )
}

export default Navbar