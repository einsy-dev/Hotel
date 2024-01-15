import { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";

export default function Auth(props: any) {
  const [type, setType] = useState("login");

  function sendData(e: FormEvent) {
    e.preventDefault();
    console.log("sendData");
    if (e.currentTarget) {
      console.log(e.currentTarget);
    }
  }
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <Form onSubmit={sendData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="example@gmail.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Пароль</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Modal.Footer className="pb-0">
            <Button variant="primary" type="submit">
              Войти
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
