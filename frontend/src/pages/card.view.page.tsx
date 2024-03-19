import CardForm from "../components/card.form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotel } from "../axios/hotel.api";
import CardView from "../components/card.view";
import ComponentLoading from "../components/hoc/component.loading";
import MyContainer from "../components/hoc/my.container";
import { getRoom, getRooms } from "../axios/room.api";
import Cards from "../components/card";

export default function CardViewPage({ isRoom = false }: { isRoom?: boolean }) {
  const [data, setData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    if (isRoom) {
      getRoom(id)
        .then((data) => {
          setData(data);
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      getHotel(id)
        .then((data) => {
          setData(data);
        })
        .then(() => {
          getRooms(id)
            .then((data) => {
              setRooms(data);
            })
            .then(() => {
              setLoading(false);
            });
        });
    }
  }, [isRoom, id]);
  return (
    <ComponentLoading isLoading={loading}>
      {editMode ? (
        <MyContainer>
          <CardForm data={data} isRoom={isRoom} setMode={setEditMode} />
        </MyContainer>
      ) : (
        <CardView data={data} setMode={setEditMode} isRoom={isRoom} />
      )}
      {!isRoom && <Cards isRoom data={rooms} />}
    </ComponentLoading>
  );
}
