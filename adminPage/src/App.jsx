import { Route, Routes } from "react-router-dom"
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import SignIn from './_auth/Forms/SignIn'
import SignUp from './_auth/Forms/SignUp'

import { Home, Allevents, Addevents, Deleteevents, NotFound, Updateevents } from './_root/pages/index'

function App() {

  return (
    <main className="w-[100vw]  px-1">
      <Routes>
        {/* private routes */}
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
        {/* public routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="Allevents" element={<Allevents />} />
          <Route path="Addevents" element={<Addevents />} />
          <Route path="Deleteevents" element={<Deleteevents />} />
          <Route path="Updateevents" element={<Updateevents />} />
          <Route path="not-found-page" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App
