import { useState } from "react";
import InputImages from "./input.images";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { saveCard } from "../../../utils/save.card";

export default function CardForm({
  data,
  type,
  hotel,
  user,
}: {
  data?: any;
  type: string;
  hotel?: string;
  user?: string;
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
            { ...hotelData, files: inputFiles, _id: data?._id, user, hotel },
            navigate,
            type,
            hotel,
            user
          )
        }
      >
        Сохранить
      </Button>
    </>
  );
}
