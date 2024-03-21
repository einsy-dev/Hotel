import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { createReservation } from "../../axios/user.api";
import reduxStore from "../../redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CalendarModal from "../modal/calendar";

export default function Cards({
  data,
  isRoom = false,
}: {
  data: any[];
  isRoom?: boolean;
}) {
  const {
    user: { _id },
    store: { order },
  } = reduxStore.getState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [resAvailable, setResAvailable] = useState(false);

  async function reservation(roomId: string, hotelId: string) {
    if (!resAvailable) {
      dispatch({ type: "SET_CALENDAR_MODAL", payload: { show: true } });
      setResAvailable(true);
    } else {
      createReservation({ userId: _id, roomId, hotelId, order });
      setResAvailable(false);
    }
  }

  return (
    <>
      {data.map((el: any, index: number) => (
        <div
          key={index}
          className="card shadow rounded-4 w-100 d-flex flex-row mb-4 border-0"
          style={{
            maxHeight: "300px",
            maxWidth: "max-content",
            minWidth: "100%",
          }}
        >
          <img
            src={process.env.REACT_APP_SERVER_API + "/" + el.images[0]}
            className="card-img rounded-start-4 rounded-end-0"
            style={{ maxWidth: "300px" }}
            alt="..."
          />
          <div className="card-body">
            {el.name && (
              <h5 className="card-title">{el.name.substring(0, 25)}</h5>
            )}
            <p className="card-text ">{el.description.substring(0, 130)}</p>
            {!isRoom ? (
              <NavLink to={"/hotel/" + el._id} className="btn btn-primary">
                Подробнее
              </NavLink>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/room/" + el._id, { state: el })}
                  className="me-4"
                >
                  Подробнее
                </Button>
                <Button onClick={() => reservation(el._id, el.hotel)}>
                  Выбрать
                </Button>
              </>
            )}
          </div>
          <CalendarModal />
        </div>
      ))}
    </>
  );
}
