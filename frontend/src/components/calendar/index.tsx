import { useState } from "react";
import moment from "moment";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Calendar() {
  const [date, setDate] = useState(moment().startOf("month"));
  const [order, setOrder] = useState({});

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
      <CalendarRender date={date.clone()} setOrder={setOrder} order={order} />
    </>
  );
}

const CalendarRender = ({
  date,
  order,
  setOrder,
}: {
  date: moment.Moment;
  order: any;
  setOrder: any;
}) => {
  const start = date.startOf("month").day();
  const days = date.daysInMonth();

  const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const emptyArr = new Array(start).fill("");
  const daysArr = Array.from({ length: days }, (_, i) => i + 1);

  const arr = splitArr(emptyArr.concat(daysArr), 7, dayOfWeek);

  return (
    <Container style={{ width: "max-content" }}>
      {arr.map((el, id) => (
        <Row key={id}>
          {el.map((i, index) => (
            <Col
              key={index}
              {...(Number(i) && {
                onClick: () => {
                  setOrder((prev: any) => {
                    let result = { ...prev };
                    let dateSet = date.set("D", i);
                    if (prev.from && prev.to && prev.from.isSame(prev.to)) {
                      if (dateSet.isAfter(prev.from)) {
                        result.to = dateSet;
                      } else if (dateSet.isBefore(prev.from)) {
                        result.from = dateSet;
                      }
                    } else {
                      result = { from: dateSet, to: dateSet };
                    }
                    return result;
                  });
                },
              })}
            >
              <Button
                className="d-flex justify-content-center align-items-center rounded-4 btn"
                variant="secondary"
                style={{ width: "50px", height: "50px" }}
                {...(Number(i) && {
                  active:
                    date.set("D", i).isSameOrAfter(order.from) &&
                    date.set("D", i).isSameOrBefore(order.to),
                })}
              >
                {i}
              </Button>
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
