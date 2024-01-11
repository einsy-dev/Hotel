import { splitArr } from "../../utils/split.array";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export function CalendarRender({
  date,
  order,
  setOrder,
}: {
  date: moment.Moment;
  order: any;
  setOrder: any;
}) {
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
            <Button
              key={index}
              style={{ width: "50px", height: "50px" }}
              className="d-flex justify-content-center align-items-center col-auto m-1"
              variant="outline-primary"
              {...(Number(i) && {
                active:
                  date.set("D", i).isSameOrAfter(order.from) &&
                  date.set("D", i).isSameOrBefore(order.to),
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
              {i}
            </Button>
          ))}
        </Row>
      ))}
    </Container>
  );
}
