import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthLayout from './_auth/AuthLayout';
import SignIn from './_auth/forms/signin';
import RootLayout from './_root/RootLayout';

import {
  Home,
  ViewAllEvents,
  CreateNewEvents,
  EditEvents,
  EventDetails,
  ViewAllUsers,
  ManageUserRoles,
  ManageProfiles,
  ViewParticipation,
  DownloadParticipateList,
  ActiveTickets,
  ManageTickets,
  RefundsRequest,
  ExportData,
  ManageContent,
  GeneralSettings,
  AssetsUpdate,
  NotFound,
  UpcommingEvents,
  HoldEvents,
} from './_root/pages/index';

function App() {
  return (
    <main>
      <Routes>
        {/* Private routes */}
        <Route element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
        </Route>
        {/* Public routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="not-found" element={<NotFound />} />
          {/* Event Management */}
          <Route path="/events/view-all" element={<ViewAllEvents />} >
            <Route index element={<UpcommingEvents />} />
            <Route path="past" element={<HoldEvents />} />
          </Route>
          <Route path="/events/create" element={<CreateNewEvents />} />
          <Route path="/events/edit/:id" element={<EditEvents />} />
          <Route path="/events/details/:id" element={<EventDetails />} />
          {/* User Management */}
          <Route path="/users/view-all" element={<ViewAllUsers />} />
          <Route path="/users/manage-roles" element={<ManageUserRoles />} />
          <Route path="/users/manage-profiles" element={<ManageProfiles />} />
          {/* Participation Management */}
          <Route path="/participation/view" element={<ViewParticipation />} />
          <Route path="/participation/download-list" element={<DownloadParticipateList />} />
          {/* Ticket Management */}
          <Route path="/tickets/active" element={<ActiveTickets />} />
          <Route path="/tickets/manage" element={<ManageTickets />} />
          <Route path="/tickets/refunds" element={<RefundsRequest />} />
          {/* Reports */}
          <Route path="/reports/export" element={<ExportData />} />
          {/* Content Management */}
          <Route path="/content/manage" element={<ManageContent />} />
          {/* Settings */}
          <Route path="/settings/general" element={<GeneralSettings />} />
          <Route path="/settings/assets-update" element={<AssetsUpdate />} />
        </Route>
      </Routes>

      {/* Toast Notifications */}
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
