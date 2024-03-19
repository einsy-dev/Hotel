import { useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getUsers } from "../../axios/admin.api";
import { useNavigate } from "react-router-dom";
import ComponentLoading from "../hoc/component.loading";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getUsers({})
      .then((data) => setUsers(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <ComponentLoading isLoading={loading}>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>№</th>
            <th>Имя</th>
            <th>Телефон</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any, index: number) => (
            <tr
              className="text-center"
              key={index}
              onClick={() => navigate(`${user._id}`, { state: user })}
            >
              <td>{++index}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ComponentLoading>
  );
}
