import { useLayoutEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getUser } from "../axios/appApi";

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>({});
  const { id } = useParams();

  useLayoutEffect(() => {
    setLoading(true);
    if (id !== undefined) {
      getUser(id).then((data) => {
        setUser(data);
        setLoading(false);
      });
    }
  }, [id]);
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
          <div className="fs-5 mb-3">{user.name}</div>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Отель</th>
                <th>Дата заезда</th>
                <th>Дата выезда</th>
              </tr>
            </thead>
            <tbody>
              {/* {users.map((user: any, index: number) => (
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
              ))} */}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}
