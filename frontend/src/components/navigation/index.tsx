import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const user = useSelector((state: any) => state.user);

  return (
    <ListGroup as="ol" className="rounded-4 shadow">
      <MyLink path="/" text="Поиск" />
      <MyLink path="/all" text="Все отели" />
      {user.isAuth && <MyLink path="/profile" text="Профиль" />}
      {user.role !== "client" && (
        <>
          <MyLink path="/admin/hotel/create" text="Админ панель" />
        </>
      )}
    </ListGroup>
  );
}

function MyLink({
  path,
  text,
  ...options
}: {
  path: string;
  text: string;
  [key: string]: any;
}): JSX.Element {
  return (
    <NavLink
      to={path}
      className="list-group-item bg-white border-0 text-decoration-none text-black"
      {...options}
    >
      {text}
    </NavLink>
  );
}
