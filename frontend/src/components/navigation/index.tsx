import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const { user } = useSelector((state: any) => state.user);

  return (
    <ListGroup as="ol" className="rounded-4 shadow">
      <MyLink path="/" text="Все гостиницы" />
      <MyLink path="/" text="Поиск Номеров" />
      {user && user.role === "admin" && (
        <>
          <MyLink path="/hotel/create" text="Добавить гостиницу" />
          <MyLink path="/users" text="Пользователи" />
        </>
      )}
    </ListGroup>
  );
}

function MyLink({ path, text }: { path: string; text: string }): JSX.Element {
  return (
    <NavLink
      to={path}
      className="list-group-item bg-white border-0 text-decoration-none text-black"
    >
      {" "}
      {">"} {text}
    </NavLink>
  );
}
