import { Route } from "react-router-dom";
import AllReservations from "../components/admin/reservations";
import Users from "../components/admin/users.list";
import CardForm from "../components/card.form";
import Profile from "../components/profile";
import AdminPage from "../pages/admin.page";

export const AdminRouter = () => (
  <Route path="admin" element={<AdminPage />}>
    <Route path="hotel/create" element={<CardForm />} />
    <Route path="users" element={<Users />} />
    <Route path="user/:id" element={<Profile />} />
    <Route path="reservations" element={<AllReservations />} />
  </Route>
);
