import { Container, Form } from "react-bootstrap";
import { format } from "../../../utils/date.format";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { debounceTime, distinctUntilChanged, fromEvent } from "rxjs";

export default function SearchForm({ search, calendar }: any) {
  const { order, name } = useSelector((state: any) => state.store);
  const dispatch = useDispatch();
  const inputRef = useRef<any>();

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    dispatch({ type: "SET_NAME", payload: value });
  }

  useEffect(() => {
    const subscription = fromEvent(inputRef.current, "keyup")
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => search());
    return () => {
      subscription.unsubscribe();
    };
  }, [search]);

  return (
    <Container className="bg-white rounded-4 shadow p-3 mb-4">
      <Form.Group className="" controlId="formBasicText">
        <Form.Control
          type="text"
          placeholder="Введите название (необязательно)"
          value={name}
          name="phone"
          onChange={changeName}
          onKeyUp={(e) => e.key === "Enter" && search()}
          ref={inputRef}
        />
      </Form.Group>

      <div
        className=" d-flex justify-content-center user-select-none mt-3"
        onClick={() => calendar(true)}
      >
        <div className="border form-control text-center">
          {format(order.from)}
        </div>
        <div className="w-25 text-center my-auto">-</div>
        <div className="border form-control text-center">
          {format(order.to)}
        </div>
      </div>
    </Container>
  );
}
