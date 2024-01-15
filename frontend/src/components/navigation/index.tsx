import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <ListGroup as="ol" className="rounded-4 shadow mt-4">
      <NavLink
        to="/"
        className=" list-group-item bg-white border-0 text-decoration-none text-black"
      >
        {">"} Все гостиницы
      </NavLink>

      <NavLink
        to="/"
        className=" list-group-item bg-white border-0 text-decoration-none text-black"
      >
        {" "}
        {">"} Поиск Номерв
      </NavLink>

      <NavLink
        to="/"
        className=" list-group-item bg-white border-0 text-decoration-none text-black"
      >
        {" "}
        {">"} Добавить гостиницу
      </NavLink>
    </ListGroup>
  );
}
