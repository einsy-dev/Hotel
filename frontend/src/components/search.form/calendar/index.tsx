import { useState } from "react";
import splitArr from "../../../utils/split.array";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import moment from "moment";

export default function Calendar({
  order,
  setOrder,
}: {
  order: any;
  setOrder: any;
}) {
  const [date, setDate] = useState(moment().startOf("month"));
  const start = date.clone().startOf("month").day();
  const days = date.clone().daysInMonth();

  const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const emptyArr = new Array(start).fill("");
  const daysArr = Array.from({ length: days }, (_, i) => i + 1);

  const arr = splitArr(emptyArr.concat(daysArr), 7, dayOfWeek);

  return (
    <>
      <div className="p-3 d-flex justify-content-between w-50 m-auto">
        <Button
          variant="secondary"
          onClick={() => setDate((prev) => prev.clone().subtract(1, "M"))}
        >
          {"<<"}
        </Button>
        <div className="align-self-center">
          {date.clone().format("MMMM YYYY")}
        </div>
        <Button
          variant="secondary"
          onClick={() => setDate((prev) => prev.clone().add(1, "M"))}
        >
          {">>"}
        </Button>
      </div>
      <Container style={{ width: "max-content" }}>
        {arr.map((el, id) => (
          <Row key={id}>
            {el.map((i, index) => (
              <Button
                key={index}
                style={{ width: "50px", height: "50px" }}
                className="d-flex justify-content-center align-items-center col-auto m-1"
                variant="outline-primary"
                {...(Number(i) && {
                  active:
                    date.clone().set("D", i).isSameOrAfter(order.from) &&
                    date.clone().set("D", i).isSameOrBefore(order.to),
                  onClick: () => {
                    setOrder((prev: any) => {
                      let result = { ...prev };
                      let dateSet = date.clone().set("D", i);
                      if (
                        prev.order.from &&
                        prev.order.to &&
                        prev.order.from.isSame(prev.order.to)
                      ) {
                        if (dateSet.isAfter(prev.order.from)) {
                          result.order.to = dateSet;
                        } else if (dateSet.isBefore(prev.order.from)) {
                          result.order.from = dateSet;
                        }
                      } else {
                        result.order = { from: dateSet, to: dateSet };
                      }
                      return result;
                    });
                  },
                })}
              >
                {i}
              </Button>
            ))}
          </Row>
        ))}
      </Container>
    </>
  );
}
