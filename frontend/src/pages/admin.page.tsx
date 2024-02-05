import { Nav } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import MyContainer from "../components/hoc/my.container";

export default function AdminPage() {
  return (
    <MyContainer>
      <Nav
        fill
        variant="tabs"
        defaultActiveKey={"hotel/create"}
        className="mb-4"
      >
        <Nav.Item>
          <NavLink className={"nav-link"} to="hotel/create">
            Создать отель
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className={"nav-link"} to="users">
            Пользователи
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className={"nav-link"} to="reservations">
            Брони
          </NavLink>
        </Nav.Item>
      </Nav>
      <Outlet />
    </MyContainer>
  );
}
