import Pagination from "../pagination";
import Card from "./card";

export default function Cards({ data, activePage, setActivePage, limit }: any) {
  return (
    <>
      {data.map((el: any, index: number) => (
        <Card
          key={index}
          img={el.images[0]}
          title={el.name}
          description={el.description}
          id={el._id}
        />
      ))}
      {limit > 1 && (
        <Pagination
          limitPage={limit}
          activePage={activePage}
          setPage={setActivePage}
        />
      )}
    </>
  );
}
