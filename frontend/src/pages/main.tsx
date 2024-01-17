import { useState } from "react";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Calendar from "../components/calendar";
import { Button, Form, Spinner } from "react-bootstrap";
import { getHotels } from "../axios/appApi";
import HotelCard from "../components/hotel/hotel.card";
import Pagination from "../components/pagination";
import useUpdateEffect from "../utils/hooks/use.update.effect";

interface IHotel {
  _id: string;
  images: string[];
  name: string;
  description: string;
}

export default function HotelSearch() {
  const [order, setOrder] = useState({ from: null, to: null });
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [short, setShort] = useState(false);
  const [searchState, setSearchState] = useState({
    name: "",
    limit: 10,
  });

  function changeName(e: React.ChangeEvent<HTMLInputElement>) {
    const { value }: { name: string; value: string } =
      e.target as HTMLInputElement;
    setSearchState((prev) => ({ ...prev, name: value.trim() }));
  }

  function startSearching() {
    if (!moment(order.from).isValid() || !moment(order.to).isValid()) {
      alert("Выберите даты");
      return;
    }
    const { name, limit } = searchState;
    const offset = (activePage - 1) * limit;
    setShort(true);
    setLoading(true);
    getHotels(name, limit, offset)
      .then((data: any) => setHotels(data))
      .then(() => setLoading(false));
  }

  useUpdateEffect(startSearching, [activePage as never]);

  return (
    <>
      <Container className="bg-white rounded-4 shadow p-4">
        <span className="text-center fs-3 w-100 d-block">Поиск гостиницы</span>
        <Form.Group className="my-3" controlId="formBasicPhone">
          <Form.Control
            type="text"
            placeholder="Введите название (необязательно)"
            value={searchState.name}
            name="phone"
            onChange={changeName}
          />
        </Form.Group>

        <div className=" d-flex justify-content-center">
          <div className="border form-control text-center">
            {moment(order.from).isValid() &&
              moment(order.from).format("DD.MM.YYYY")}
          </div>
          <div className="w-25 text-center my-auto">-</div>
          <div className="border form-control text-center">
            {moment(order.to).isValid() &&
              moment(order.to).format("DD.MM.YYYY")}
          </div>
        </div>

        {!short && <Calendar setOrder={setOrder} order={order} />}

        <Button
          variant="primary"
          className="mt-4 px-4"
          onClick={startSearching}
        >
          Поиск
        </Button>
      </Container>
      {loading ? (
        <>
          <Spinner
            animation="border"
            variant="primary"
            className="m-auto mt-5"
          />
        </>
      ) : (
        short && (
          <>
            {hotels.map((el) => (
              <HotelCard
                img={el.images[0]}
                title={el.name}
                description={el.description}
                id={el._id}
              />
            ))}
            <Pagination
              limitPage={10}
              activePage={activePage}
              setPage={setActivePage}
            />
          </>
        )
      )}
    </>
  );
}
