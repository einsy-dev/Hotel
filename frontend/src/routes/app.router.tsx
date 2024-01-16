import { Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import Hotel from "../pages/hotel";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/hotel" element={<Hotel />} />
    </Routes>
  );
};

export default AppRouter;
