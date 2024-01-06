import { useLayoutEffect, useState } from "react";
import moment from "moment";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Calendar() {
  const [date, setDate] = useState(moment());
  const [order, setOrder] = useState({ from: 0, to: 0 });

  useLayoutEffect(() => {
    console.log(order);
  });

  return (
    <>
      <Container className="p-3 d-flex justify-content-between w-25">
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
      <CalendarRender
        start={date.clone().startOf("month").day()}
        days={date.clone().daysInMonth()}
      />
    </>
  );
}

const CalendarRender = ({ start, days }: { start: number; days: number }) => {
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const emptyArr = new Array(start).fill("");
  const daysArr = Array.from({ length: days }, (_, i) => i + 1);

  const arr = splitArr(emptyArr.concat(daysArr), 7, dayOfWeek);

  console.log(arr);
  return (
    <Container className="w-50">
      {arr.map((el) => (
        <Row className="justify-content-md-start">
          {el.map((i) => (
            <Col
              className="m-0 border border-1 d-flex justify-content-center align-items-center"
              style={{ height: "50px", width: "50px" }}
            >
              {i}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

function splitArr(arr: Array<any>, n: number, initialArr: Array<any>) {
  const newArr = [initialArr];
  for (let i = 0; i < arr.length; i += n) {
    newArr.push(arr.slice(i, i + n));
  }
  if ((newArr.length - 1) % n) {
    newArr[newArr.length - 1] = newArr[newArr.length - 1].concat(
      new Array(n - newArr[newArr.length - 1].length).fill("")
    );
  }
  return newArr;
}
