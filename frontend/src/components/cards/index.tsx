import { NavLink } from "react-router-dom";
import Pagination from "../pagination";
import { Button } from "react-bootstrap";
import { createReservation } from "../../axios/userApi";
import reduxStore from "../../redux";

export default function Cards({
  data,
  activePage,
  setActivePage,
  limit,
  isRoom = false,
}: {
  data: any[];
  activePage: number;
  setActivePage: any;
  limit?: number;
  isRoom?: boolean;
}) {
  console.log(data);
  const {
    user: { _id },
    store: { order },
  } = reduxStore.getState();
  async function reservation(roomId: string, hotelId: string) {
    if (order === null) {
      alert("Выберите даты для бронирования");
      return;
    }
    createReservation({ userId: _id, roomId, hotelId, order }).then(() => {
      console.log("object");
    });
  }
  return (
    <>
      {data.map((el: any, index: number) => (
        <div
          key={index}
          className="card shadow rounded-4 w-100 d-flex flex-row mb-4"
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
              <Button onClick={() => reservation(el._id, el.hotel)}>
                Выбрать
              </Button>
            )}
          </div>
        </div>
      ))}
      {!isRoom && limit && (
        <Pagination
          limitPage={limit}
          activePage={activePage}
          setPage={setActivePage}
        />
      )}
    </>
  );
}
