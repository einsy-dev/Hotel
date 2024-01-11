import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="w-25">
      <ListGroup as="ol" className="rounded-4">
        <ListGroup.Item as="li">
          <NavLink to="/" className="text-decoration-none text-black">
            {">"} Все гостиницы
          </NavLink>
        </ListGroup.Item>

        <ListGroup.Item>
          <NavLink to="/" className="text-decoration-none text-black">
            {">"} Поиск Номерв
          </NavLink>
        </ListGroup.Item>
        <ListGroup.Item>
          <NavLink to="/" className="text-decoration-none text-black">
            {">"} Добавить гостиницу
          </NavLink>
        </ListGroup.Item>
      </ListGroup>
    </nav>
  );
}
