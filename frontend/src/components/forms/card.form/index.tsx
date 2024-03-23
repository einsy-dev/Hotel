import { useState } from "react";
import InputImages from "./input.images";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import saveCard from "../../../utils/save.card";

export default function CardForm({
  data,
  isRoom = false,
  hotel,
  setMode,
}: {
  data?: any;
  isRoom?: boolean;
  hotel?: string;
  setMode?: any;
}) {
  const [inputFiles, setInputFiles] = useState<string[]>([]);
  const [hotelData, setHotelData] = useState({
    name: data ? data.name : "",
    description: data ? data.description : "",
    images: data ? data.images : [],
  });
  const navigate = useNavigate();
  return (
    <>
      <InputImages
        setInputFiles={setInputFiles}
        images={hotelData.images}
        setImages={setHotelData}
      />

      <Form.Label htmlFor="name" className="mt-3 user-select-none">
        Название
      </Form.Label>
      <Form.Control
        id="name"
        value={hotelData.name}
        onChange={(e) => setHotelData({ ...hotelData, name: e.target.value })}
        disabled={isRoom}
      />

      <Form.Label htmlFor="descriptions" className="mt-3 user-select-none">
        Описание
      </Form.Label>
      <Form.Control
        as="textarea"
        id="descriptions"
        rows={5}
        value={hotelData.description}
        onChange={(e) =>
          setHotelData({ ...hotelData, description: e.target.value })
        }
      />
      <Button
        className="mt-4"
        onClick={() =>
          saveCard(
            { ...hotelData, files: inputFiles, id: data?._id, hotel },
            navigate,
            isRoom
          )
        }
      >
        Сохранить
      </Button>
      <Button
        variant="danger"
        className="mt-4 ms-4"
        onClick={() => setMode(false)}
      >
        Отменить
      </Button>
    </>
  );
}
