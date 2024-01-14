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
    <div className="card shadow m-2 rounded-4" style={{ width: "19rem" }}>
      <img src={img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <NavLink to={"/" + id} className="btn btn-primary">
          Подробнее
        </NavLink>
      </div>
    </div>
  );
}
