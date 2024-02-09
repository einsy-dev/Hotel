import { useState } from "react";
import Carousel from "../carousel";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import CardForm from "../card.form";
import MyContainer from "../hoc/my.container";

export default function CardView({
  data,
  setMode,
  isRoom = false,
}: {
  data: any;
  setMode?: any;
  isRoom?: boolean;
}) {
  const { _id, images, name, description } = data;
  const [addRoom, setAddRoom] = useState(false);
  const { role } = useSelector((state: any) => state.user);

  return (
    <>
      <MyContainer>
        <Carousel images={images} />
        <div className="fs-3 my-3">{name}</div>
        <label htmlFor="description" className="w-100 text-center fs-5 mb-3">
          Описание
        </label>
        <div id="description" className="">
          {description}
        </div>
        {role === "admin" && (
          <div className="mt-4">
            <Button className="bg-success" onClick={() => setMode(true)}>
              Редактивировать
            </Button>
            {!isRoom && (
              <Button
                className="bg-secondary ms-4"
                onClick={() => setAddRoom(!addRoom)}
              >
                Добавить номер
              </Button>
            )}
          </div>
        )}
      </MyContainer>

      {addRoom && (
        <MyContainer>
          <CardForm isRoom hotel={_id} />
        </MyContainer>
      )}
    </>
  );
}
