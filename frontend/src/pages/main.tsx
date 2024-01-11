import Container from "react-bootstrap/Container";
import Calendar from "../components/calendar";
import Rooms from "../components/rooms";
import Pagination from "../components/pagination";
import { NavLink } from "react-router-dom";
import Navigation from "../components/navigation";

export default function Main() {
  return (
    <Container className="d-flex flex-column bg-light">
      <header className="d-flex my-4">
        <NavLink
          to="/"
          className="text-decoration-none w-25 bg-primary text-white py-4 text-center rounded-4 shadow"
        >
          logo
        </NavLink>

        <NavLink
          to="/"
          className="ms-4 p-4 bg-white text-decoration-none w-50 text-end rounded-4 shadow"
        >
          Войти
        </NavLink>
      </header>

      <main className="d-flex">
        <Navigation />
        <div className="d-flex flex-column w-50 ms-4 bg-white rounded-4">
          <span className="text-center fs-3 ">Поиск гостиницы</span>
          <Calendar />
          <Rooms />
          <Pagination limitPage={5} activePage={3} />
        </div>
      </main>
    </Container>
  );
}
