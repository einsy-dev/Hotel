import { useState } from "react";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { CalendarRender } from "./calendar.render";

export default function Calendar() {
  const [date, setDate] = useState(moment().startOf("month"));
  const [order, setOrder] = useState({});

  return (
    <>
      <Container className="p-3 d-flex justify-content-between w-50">
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
      </Container>
      <CalendarRender date={date.clone()} setOrder={setOrder} order={order} />
    </>
  );
}
