import { Button, Container, Form } from "react-bootstrap";
import Calendar from "./calendar";
import moment from "moment";
import { useState } from "react";

export default function SearchForm({ state, setState, search }: any) {
  const [short, setShort] = useState(false);
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
            {moment(state.order.from).isValid() &&
              moment(state.order.from).format("DD.MM.YYYY")}
          </div>
          <div className="w-25 text-center my-auto">-</div>
          <div className="border form-control text-center">
            {moment(state.order.to).isValid() &&
              moment(state.order.to).format("DD.MM.YYYY")}
          </div>
        </div>
      )}

      {!short && <Calendar setOrder={setState} order={state.order} />}

      <Button
        variant="primary"
        className="mt-3 px-4"
        onClick={() => {
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
