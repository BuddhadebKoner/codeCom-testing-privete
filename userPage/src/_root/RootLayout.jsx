import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"

const RootLayout = () => {
  return (
    <>
      <main className="w-[100vw] lg:px-[15vw] md:px-[5rem] px-1">
        <Navbar />
        <section>
          <Outlet />
        </section>
      </main>
    </>
  )
}

export default RootLayout