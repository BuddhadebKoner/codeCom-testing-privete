import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import SignIn from './_auth/Forms/SignIn';
import SignUp from './_auth/Forms/SignUp';

import { Home, About, UpcomingEvents, EventDetails, NotFound, Profile, AttendedEvents, OrganizedEvents, ProfileInfo, ActiveTickets, LiveEvents, ConductedEvents, LeftNavbar, EventCalendar } from './_root/pages/index';
import EntryPass from "./_protected/EntryPass";

function App() {
  // right click not allowed
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  return (
    <main>
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
          <Route path="/learn" element={<LeftNavbar />} />
          <Route path="/event-calender" element={<EventCalendar />} />
          <Route path="/profile/:userId" element={<Profile />}>
            <Route index element={<ProfileInfo />} />
            <Route path="attended" element={<AttendedEvents />} />
            <Route path="organized" element={<OrganizedEvents />} />
            <Route path="active-tickets" element={<ActiveTickets />} />
          </Route>
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events" element={<UpcomingEvents />}>
            <Route path="upcomming-events" element={<LiveEvents />} />
            <Route path="conducted-events" element={<ConductedEvents />} />
          </Route>
          <Route path="/not-found-page" element={<NotFound />} />
        </Route>

        {/* Entry Pass route */}
        <Route path="/entry-pass/:userId/:eventId/:entryId" element={<EntryPass />} />
      </Routes>

      {/* ToastContainer goes here */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}

export default App;
