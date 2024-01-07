/*
import { useEffect, useState } from "react";

export default function Pagination({ pageState, limitPage, activePage }) {
  const [active, setActive] = useState(activePage);
  const [result, setResult] = useState([]);
  const pages = Array.from({ length: limitPage }, (_, i) => i + 1);

  const handleClick = (i) => {
    pageState(i);
    setActive(i);
    document.documentElement.scrollTop = 0;
    localStorage.setItem("page", JSON.stringify(i));
  };

  useEffect(() => {
    if (limitPage <= 5) {
      setResult(pages.slice(0, limitPage));
    } else if (active <= 2) {
      setResult(pages.slice(0, 5));
    } else if (active >= limitPage - 2) {
      setResult(pages.slice(limitPage - 5, limitPage));
    } else {
      setResult(pages.slice(active - 3, active + 2));
    }
  }, [active, limitPage]);

  return (
    <div className="mt-auto w-100 d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className={active === 1 ? "page-link disabled" : "page-link"}
              onClick={() => handleClick(active - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {result?.map((el, id) => (
            <li className="page-item" key={id}>
              <button
                className={active === el ? "page-link active" : "page-link"}
                onClick={() => handleClick(el)}
              >
                {el}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className={
                active === limitPage ? "page-link disabled" : "page-link"
              }
              onClick={() => handleClick(active + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
 */
export {};
