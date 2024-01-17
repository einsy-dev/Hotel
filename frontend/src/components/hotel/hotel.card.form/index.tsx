import { useState } from "react";
import InputImages from "./input.images";
import { Button, Form } from "react-bootstrap";
import { createHotel } from "../../../axios/appApi";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [inputFiles, setInputFiles] = useState<string[]>([]);
  const [hotelDate, setHotelData] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  function saveHotel() {
    const formData = new FormData();
    formData.append("name", hotelDate.name);
    formData.append("description", hotelDate.description);
    for (let i = 0; i < inputFiles.length; i++) {
      formData.append("files", inputFiles[i]);
    }

    createHotel(formData).then((data) => navigate(`/hotel/${data._id}`));
  }

  return (
    <>
      <InputImages setInputFiles={setInputFiles} />

      <Form.Label htmlFor="name" className="mt-3 user-select-none">
        Название
      </Form.Label>
      <Form.Control
        id="name"
        value={hotelDate.name}
        onChange={(e) => setHotelData({ ...hotelDate, name: e.target.value })}
      />

      <Form.Label htmlFor="descriptions" className="mt-3 user-select-none">
        Описание
      </Form.Label>
      <Form.Control
        as="textarea"
        id="descriptions"
        rows={5}
        value={hotelDate.description}
        onChange={(e) =>
          setHotelData({ ...hotelDate, description: e.target.value })
        }
      />
      <Button className="mt-4" onClick={saveHotel}>
        Сохранить
      </Button>
    </>
  );
}
