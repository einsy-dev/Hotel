import { useLayoutEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ComponentLoading from "../hoc/component.loading";
import { getUserReservations } from "../../axios/user.api";
import Reservations from "../reservations";

export default function Profile({ data: user }: { data?: any }) {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  const state = useLocation().state;
  const data = user || state;

  useLayoutEffect(() => {
    setLoading(true);
    if (data === null) navigate("/admin/users", { replace: true });
    getUserReservations(data._id)
      .then((res) => setReservations(res))
      .finally(() => setLoading(false));
  }, [data, navigate]);
  return (
    <ComponentLoading isLoading={loading}>
      <Col className="w-75 m-auto mb-4">
        <Row className="mb-3">
          <label htmlFor="name">Имя</label>
          <div className="fs-5 border rounded-4" id="name">
            {data.name}
          </div>
        </Row>
        <Row className="mb-3">
          <label htmlFor="name">Email</label>
          <div className="fs-5 border rounded-4" id="name">
            {data.email}
          </div>
        </Row>
        <Row>
          <label htmlFor="name">Телефон</label>
          <div className="fs-5 border rounded-4" id="name">
            {data.phone}
          </div>
        </Row>
      </Col>
      {reservations.length > 0 && (
        <>
          <div className="fs-4 text-center mb-3">История</div>
          <Reservations data={reservations} />
        </>
      )}
    </ComponentLoading>
  );
}
