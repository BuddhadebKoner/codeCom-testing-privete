import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <section>
        <Outlet />
      </section>
    </>
  )
}

export default RootLayout