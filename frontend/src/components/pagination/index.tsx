import { useEffect, useState } from "react";

export default function Pagination({
  limit,
  callback,
  page,
}: {
  limit: number;
  callback: any;
  page?: number;
}) {
  const [result, setResult] = useState([]);
  const [activePage, setActivePage] = useState(page || 1);
  const pages: any = Array.from({ length: limit }, (_, i) => i + 1);

  const handleClick = (i: number) => {
    setActivePage(i);
    callback(i);
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    if (limit <= 5) {
      setResult(pages.slice(0, limit));
    } else if (activePage <= 2) {
      setResult(pages.slice(0, 5));
    } else if (activePage >= limit - 2) {
      setResult(pages.slice(limit - 5, limit));
    } else {
      setResult(pages.slice(activePage - 3, activePage + 2));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage, limit]);

  return (
    <div className="mt-4 w-100 d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className={activePage === 1 ? "page-link disabled" : "page-link"}
              onClick={() => handleClick(activePage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {result?.map((el, id) => (
            <li className="page-item" key={id}>
              <button
                className={activePage === el ? "page-link active" : "page-link"}
                onClick={() => activePage !== el && handleClick(el)}
              >
                {el}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className={
                activePage === limit ? "page-link disabled" : "page-link"
              }
              onClick={() => handleClick(activePage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
