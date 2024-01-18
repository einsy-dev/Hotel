import { useLayoutEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { getUsers } from "../axios/appApi";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Spinner
            animation="border"
            variant="primary"
            className="m-auto mt-5"
          />
        </>
      ) : (
        <Container className="bg-white rounded-4 shadow pt-4 pb-2 px-4 ">
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
                  onClick={() => navigate(`/user/${user._id}`)}
                >
                  <td>{++index}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}
