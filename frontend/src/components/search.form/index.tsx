import { Button, Container, Form } from "react-bootstrap";
import Calendar from "./calendar";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { format } from "../../utils/date.format";

export default function SearchForm({ state, setState, search }: any) {
  const [short, setShort] = useState(false);
  const dispatch = useDispatch();

  // Functions

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    setState((prev: any) => ({ ...prev, name: value.trim() }));
  }

  return (
    <Container className="bg-white rounded-4 shadow p-3 mb-4">
      <Form.Group className="" controlId="formBasicText">
        <Form.Control
          type="text"
          placeholder="Введите название (необязательно)"
          value={state.name}
          name="phone"
          onChange={changeName}
        />
      </Form.Group>

      {moment(state.order.from).isValid() && (
        <div className=" d-flex justify-content-center user-select-none mt-3">
          <div className="border form-control text-center">
            {moment(state.order.from).isValid() && format(state.order.from)}
          </div>
          <div className="w-25 text-center my-auto">-</div>
          <div className="border form-control text-center">
            {moment(state.order.to).isValid() && format(state.order.to)}
          </div>
        </div>
      )}

      {!short && <Calendar setOrder={setState} order={state.order} />}

      <Button
        variant="primary"
        className="mt-3 px-4"
        onClick={() => {
          dispatch({
            type: "ORDER",
            payload: {
              from: format(state.order.from),
              to: format(state.order.to),
            },
          });
          setShort(true);
          search();
        }}
      >
        Поиск
      </Button>

      <Button
        variant="secondary"
        className="mt-3 ms-4 px-4"
        onClick={() => setShort(!short)}
      >
        {short ? "Выбрать" : "Скрыть"}
      </Button>
    </Container>
  );
}
