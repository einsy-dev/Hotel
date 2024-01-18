import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main.page";
import HotelPage from "../pages/hotel.page";
import UsersPage from "../pages/users.page";
import UserPage from "../pages/user.page";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<MainPage search />} />
    <Route path="/hotels" element={<MainPage />} />
    <Route path="/hotel/:param" element={<HotelPage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/user/:id" element={<UserPage />} />
  </Routes>
);

export default AppRouter;
