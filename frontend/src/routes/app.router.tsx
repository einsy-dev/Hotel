import { Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import CreateHotel from "../pages/hotel";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="/hotel/:id" element={<Main />} />
    <Route path="/hotel/create" element={<CreateHotel />} />
  </Routes>
);

export default AppRouter;
