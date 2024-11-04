import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="w-full flex flex-col py-5">
      <img
        className="w-full lg:h-[350px] object-cover lg:rounded-3xl"
        src="/assets/event-default-banner.webp" alt="" />
      <div className="flex flex-col py-8 gap-3">
        <h1 className="lg:text-3xl text-xl font-medium">Welcome to our Coding Club : CodeCom</h1>
        <a
          className="underline lg:text-xl text-sm w-fit"
          target="_blank"
          href="https://icampus.setgoi.ac.in/">Sanaka Educational Trust's Group of Institutions, Malandighi, Durgapur</a>
        <h2
          className="lg:text-xl text-sm"
        >Join us to get to know your leads and mentors in person and form wonderful real life connections!</h2>
      </div>
      <div className="w-full">
        <div className="flex justify-between bg-[#D9D9D9] px-6 lg:py-5 py-2 lg:rounded-xl">
          <h1>Upcoming Events</h1>
          <Link to="/upcoming-events">View all</Link>
        </div>
      </div>
    </div>
  )
}

export default Home