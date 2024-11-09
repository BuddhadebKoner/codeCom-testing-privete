import { Route, Routes } from "react-router-dom"
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import SignIn from './_auth/Forms/SignIn'

import { Home, Allevents, Addevents, ClubMembers, NotFound, AllTickets, EventDetails } from './_root/pages/index'

function App() {

  return (
    <main className="w-[100vw]  px-1">
      <Routes>
        {/* private routes */}
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
        </Route>
        {/* public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="Allevents" element={<Allevents />} />
          <Route path="Addevents" element={<Addevents />} />
          <Route path="ClubMembers" element={<ClubMembers />} />
          <Route path="AllTickets" element={<AllTickets />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="not-found-page" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
