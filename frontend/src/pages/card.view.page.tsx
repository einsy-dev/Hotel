import CardForm from "../components/card.form";
import { useLocation, useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { getHotel } from "../axios/appApi";
import CardView from "../components/card.view";
import ComponentLoading from "../components/hoc/component.loading";
import MyContainer from "../components/hoc/my.container";

export default function CardViewPage({
  create = false,
  isRoom = false,
}: {
  create?: boolean;
  isRoom?: boolean;
}) {
  const state = useLocation().state;
  const [data, setData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useLayoutEffect(() => {
    setLoading(true);
    if (create) {
      setData({});
      setEditMode(true);
      setLoading(false);
      return;
    }
    if (!id) return;
    if (!isRoom) {
      getHotel(id)
        .then((data) => {
          setData(data);
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      setData(state);
      setLoading(false);
    }
  }, [create, isRoom, id]);
  return (
    <ComponentLoading isLoading={loading}>
      {editMode ? (
        <MyContainer>
          <CardForm data={data} isRoom={isRoom} />
        </MyContainer>
      ) : (
        <CardView data={data} setMode={setEditMode} isRoom={isRoom} />
      )}
    </ComponentLoading>
  );
}
