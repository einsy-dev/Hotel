import { Button, Form } from "react-bootstrap";
import { signUpUser } from "../../axios/user.api";
import { FormEvent, useState } from "react";

export default function UserForm() {
  type TData = {
    name: string;
    email: string;
    password: string;
    phone: string;
  };

  const [data, setData] = useState<TData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [status, setStatus] = useState("");

  function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signUpUser(data.name, data.email, data.password, data.phone).catch((err) =>
      setStatus("Ошибка регистрации")
    );
  }

  function changeData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    setData({ ...data, [name]: value.trim() });
  }

  return (
    <Form onSubmit={sendData}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          type="text"
          value={data.name}
          name="name"
          onChange={changeData}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="example@gmail.com"
          value={data.email}
          name="email"
          onChange={changeData}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          value={data.password}
          name="password"
          onChange={changeData}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Телефон</Form.Label>
        <Form.Control
          type="tel"
          value={data.phone}
          name="phone"
          onChange={changeData}
        />
      </Form.Group>
      <Form.Label className="text-danger">{status}</Form.Label>
      <Button variant="primary" type="submit">
        Создать
      </Button>
    </Form>
  );
}
