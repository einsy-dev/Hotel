import { NavLink } from "react-router-dom";

export default function RoomCard({
  img,
  title,
  description,
  id,
}: {
  img: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div
      className="card shadow rounded-4 w-100 d-flex flex-row  mt-4"
      style={{ maxHeight: "max-content", minWidth: "max-content" }}
    >
      <img
        src={img}
        className="card-img rounded-start-4 rounded-end-0"
        style={{ maxWidth: "300px" }}
        alt="..."
      />
      <div className="card-body ">
        <h5 className="card-title">{title}</h5>
        <p className="card-text h-50 mt-4">{description}</p>
        <NavLink to={"/" + id} className="btn btn-primary position-absolute bottom-0 end-0 m-4">
          Подробнее
        </NavLink>
      </div>
    </div>
  );
}
