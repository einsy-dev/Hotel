import { Spinner } from "react-bootstrap";
import CardForm from "../components/cards/card.view.form";
import { useParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { getHotel } from "../axios/appApi";
import CardView from "../components/cards/card.view";

export default function HotelPage() {
  const [hotel, setHotel] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const { param } = useParams();

  useLayoutEffect(() => {
    setLoading(true);
    if (param === "create") {
      setHotel({});
      setEditMode(true);
      setLoading(false);
      return;
    }
    if (param !== undefined) {
      getHotel(param)
        .then((data) => {
          setHotel(data);
        })
        .then(() => {
          setLoading(false);
        });
    }
  }, [param]);
  return (
    <>
      {loading ? (
        <>
          <Spinner
            animation="border"
            variant="primary"
            className="m-auto mt-5"
          />
        </>
      ) : editMode ? (
        <CardForm data={hotel} type="hotel" />
      ) : (
        <CardView data={hotel} setMode={setEditMode} />
      )}
    </>
  );
}
