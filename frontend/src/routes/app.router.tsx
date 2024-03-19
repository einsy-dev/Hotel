import { Route, Routes } from "react-router-dom";
import CardViewPage from "../pages/card.view.page";
import ProfilePage from "../pages/profile.page";
import SearchPage from "../pages/search.page";
import { AdminRouter } from "./admin.router";
const AppRouter = ({ role }: any) => (
  <Routes>
    <Route path="/" element={<SearchPage />} />
    <Route path="/all" element={<SearchPage all />} />
    <Route path="/hotel/:id" element={<CardViewPage />} />
    <Route path="/room/:id" element={<CardViewPage isRoom />} />
    <Route path="/profile" element={<ProfilePage />} />
    {role !== "client" && AdminRouter(role)}
  </Routes>
);

export default AppRouter;
