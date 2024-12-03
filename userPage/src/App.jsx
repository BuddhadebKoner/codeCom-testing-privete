import { Route, Routes } from "react-router-dom"
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import SignIn from './_auth/Forms/SignIn'
import SignUp from './_auth/Forms/SignUp'

import { Home, About, UpcomingEvents, EventDetails, NotFound, Profile, AttendedEvents, OrganizedEvents, ProfileInfo, EditProfile } from './_root/pages/index'
import EntryPass from "./_protected/EntryPass"

function App() {

  return (
    <main >
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
          <Route path="/profile/:userId/edit" element={<EditProfile />} />
          <Route path="/profile/:userId" element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="attended" element={<AttendedEvents />} />
            <Route path="organized" element={<OrganizedEvents />} />
          </Route>
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/upcoming-events" element={<UpcomingEvents />} />
          <Route path="/not-found-page" element={<NotFound />} />
        </Route>

        {/* Entry Pass route */}
        <Route path="/entry-pass/:userId/:eventId/:entryId" element={<EntryPass />} />
      </Routes>
    </main>
  )
}

export default App