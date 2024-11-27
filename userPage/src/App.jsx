import { Route, Routes } from "react-router-dom"
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import SignIn from './_auth/Forms/SignIn'
import SignUp from './_auth/Forms/SignUp'

import { Home, About, Event, UpcomingEvents, EventDetails, NotFound, Profile } from './_root/pages/index'
import EntryPass from "./_protected/EntryPass"

function App() {

  return (
    <main className="w-[100vw] lg:px-[15vw] md:px-[5rem] px-1">
      <Routes>
        {/* private routes */}
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        {/* public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/event" element={<Event />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/not-found-page" element={<NotFound />} />
        </Route>
        <Route path="/entry-pass/:userId/:eventId/:entryId" element={<EntryPass />} />
      </Routes>
    </main>
  )
}

export default App