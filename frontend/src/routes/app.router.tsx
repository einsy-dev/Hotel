import { Route, Routes } from "react-router-dom";
import CardViewPage from "../pages/card.view.page";
import ProfilePage from "../pages/profile.page";
import SearchPage from "../pages/search.page";
import Users from "../components/admin/users.list";
import AdminPage from "../pages/admin.page";
import CardForm from "../components/card.form";
import Profile from "../components/profile";
import AllReservations from "../components/admin/reservations";
const AppRouter = ({ role }: any) => (
  <Routes>
    <Route path="/" element={<SearchPage />} />
    <Route path="/all" element={<SearchPage all />} />
    <Route path="/hotel/:id" element={<CardViewPage />} />
    <Route path="/room/:id" element={<CardViewPage isRoom />} />
    <Route path="/profile" element={<ProfilePage />} />
    {role !== "client" && (
      <>
        <Route path="admin" element={<AdminPage />}>
          {/* Parent route accepts is`s element for chieldrens (passed to element as <Outlet />) */}
          <Route path="hotel/create" element={<CardForm />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<Profile />} />
          <Route path="reservations" element={<AllReservations />} />
        </Route>
      </>
    )}
  </Routes>
);

export default AppRouter;
