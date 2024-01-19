import { useLayoutEffect, useState } from "react";
import Carousel from "../../carousel";
import { getHotelRooms } from "../../../axios/appApi";
import Cards from "..";
import { useSelector } from "react-redux";
import { Button, Container } from "react-bootstrap";
import CardForm from "../card.view.form";

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
  const [rooms, setRooms] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [addRoom, setAddRoom] = useState(false);
  const user = useSelector((state: any) => state.user);
  useLayoutEffect(() => {
    !isRoom && getHotelRooms(_id).then((data) => setRooms(data));
  }, []);

  return (
    <>
      <Container className="bg-white rounded-4 shadow p-4 mb-4">
        <Carousel images={images} />
        <div className="fs-3 my-3">{name}</div>
        <label htmlFor="description" className="w-100 text-center fs-5 mb-3">
          Описание
        </label>
        <div id="description" className="">
          {description}
        </div>
        {user.role === "admin" && (
          <div className="mt-4">
            <Button className="bg-success" onClick={() => setMode(true)}>
              Редактивировать
            </Button>
            <Button
              className="bg-secondary ms-4"
              onClick={() => setAddRoom(!addRoom)}
            >
              Добавить номер
            </Button>
          </div>
        )}
      </Container>

      {addRoom ? (
        <Container className="bg-white rounded-4 shadow p-4 mb-4">
          <CardForm type="room" hotel={_id} />
        </Container>
      ) : null}

      {!isRoom ? (
        <Cards
          isRoom
          data={rooms}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      ) : null}
    </>
  );
}
