import { NavLink } from "react-router-dom";

export default function Card({
  img,
  title,
  description,
  id,
}: {
  img: string;
  title?: string;
  description: string;
  id: string;
}) {
  return (
    <div
      className="card shadow rounded-4 w-100 d-flex flex-row mb-4"
      style={{
        maxHeight: "300px",
        maxWidth: "max-content",
        minWidth: "100%",
      }}
    >
      <img
        src={process.env.REACT_APP_SERVER_API + "/" + img}
        className="card-img rounded-start-4 rounded-end-0"
        style={{ maxWidth: "300px" }}
        alt="..."
      />
      <div className="card-body">
        {title && <h5 className="card-title">{title.substring(0, 25)}</h5>}
        <p className="card-text ">{description.substring(0, 130)}</p>
        <NavLink to={"/hotel/" + id} className="btn btn-primary">
          Подробнее
        </NavLink>
      </div>
    </div>
  );
}
