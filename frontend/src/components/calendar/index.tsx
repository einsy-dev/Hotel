import { useState } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { CalendarRender } from "./calendar.render";

export default function Calendar() {
  const [date, setDate] = useState(moment().startOf("month"));
  const [order, setOrder] = useState({});

  return (
    <Container className="bg-white rounded-4 shadow p-4">
      <span className="text-center fs-3 w-100 d-block">Поиск гостиницы</span>
      <div className="p-3 d-flex justify-content-between w-50 m-auto">
        <Button
          variant="secondary"
          onClick={() => setDate((prev) => prev.clone().subtract(1, "M"))}
        >
          {"<<"}
        </Button>
        <div className="align-self-center">{date.format("MMMM YYYY")}</div>
        <Button
          variant="secondary"
          onClick={() => setDate((prev) => prev.clone().add(1, "M"))}
        >
          {">>"}
        </Button>
      </div>
      <CalendarRender date={date.clone()} setOrder={setOrder} order={order} />
    </Container>
  );
}
