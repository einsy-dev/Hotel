import { useLayoutEffect, useState } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getUserReservations } from "../axios/userApi";
import moment from "moment";

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const { id } = useParams();

  useLayoutEffect(() => {
    setLoading(true);
    if (id !== undefined) {
      getUserReservations(id).then((data) => {
        setData(data);
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
              {data?.map((el: any, index: number) => (
                <tr className="text-center" key={index}>
                  <td>{++index}</td>
                  <td>{el.hotelId}</td>
                  <td>{moment(data.dateStart).format("DD.MM.YYYY")}</td>
                  <td>{moment(data.dateEnd).format("DD.MM.YYYY")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
}
