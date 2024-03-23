import { Route } from "react-router-dom";
import AllReservations from "../components/admin/reservations";
import Users from "../components/admin/users.list";
import CardForm from "../components/forms/card.form";
import Profile from "../components/profile";
import AdminPage from "../pages/admin.page";
import UserForm from "../components/forms/user.form";

export const AdminRouter = ({ role }: any) => (
  <Route path="admin" element={<AdminPage />}>
    {role !== "manager" && <Route path="hotel/create" element={<CardForm />} />}
    {role !== "manager" && <Route path="user/create" element={<UserForm />} />}
    <Route path="user" element={<Users />} />
    <Route path="user/:id" element={<Profile />} />
    <Route path="reservations" element={<AllReservations />} />
  </Route>
);
