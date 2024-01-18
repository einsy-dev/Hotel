import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";
import { signInUser, signUpUser } from "../../axios/userApi";
import Cookies from "js-cookie";

type TData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export default function Auth({
  show,
  onHide,
  login,
}: {
  show: boolean;
  onHide: () => void;
  login: boolean;
}) {
  const [data, setData] = useState<TData>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  function sendData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (login) {
      signInUser(data.email, data.password)
        .then((data) => Cookies.set("token", data.access_token))
        .finally(() => document.location.reload())
        .catch(() => console.log("Ошибка входа"));
    } else {
      signUpUser(data.name, data.email, data.password, data.phone)
        .then((data) => Cookies.set("token", data.access_token))
        .finally(() => document.location.reload())
        .catch(() => console.log("Ошибка регистрации"));
    }
  }

  function changeData(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    setData({ ...data, [name]: value.trim() });
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <Form onSubmit={sendData}>
          {!login && (
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                autoComplete="username"
                value={data.name}
                name="name"
                onChange={changeData}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
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
              autoComplete="current-password"
              value={data.password}
              name="password"
              onChange={changeData}
            />
          </Form.Group>

          {!login && (
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="tel"
                autoComplete="tel"
                value={data.phone}
                name="phone"
                onChange={changeData}
              />
            </Form.Group>
          )}

          <Modal.Footer className="pb-0">
            <Button variant="primary" type="submit">
              {login ? "Войти" : "Регистрация"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

/* name, email, password, phone, role? */
