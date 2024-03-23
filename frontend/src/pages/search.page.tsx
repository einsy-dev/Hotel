import { useEffect, useState } from "react";
import { getHotels } from "../axios/hotel.api";
import Cards from "../components/card";
import SearchForm from "../components/forms/search.form";
import ComponentLoading from "../components/hoc/component.loading";
import Pagination from "../components/pagination";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Calendar from "../components/calendar";

export default function SearchPage({ all = false }: { all?: boolean }) {
  const { name, limit, order } = useSelector((state: any) => state.store); // this limit is for req items quantity
  const [hotels, setHotels] = useState({
    data: [],
    limit: 0, // for pagination only
  });
  const [loading, setLoading] = useState(false);
  const [calendar, setCalendar] = useState(false);

  function startSearching(page: number = 1) {
    if (name.trim() === "" && !all) return;
    const offset = (page - 1) * limit;
    setLoading(true);
    getHotels({ name, limit, order, offset })
      .then((res: any) => setHotels(res))
      .then(() => setLoading(false));
  }

  useEffect(() => {
    all ? startSearching() : setHotels({ data: [], limit: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [all]);
  return (
    <>
      <SearchForm search={startSearching} calendar={setCalendar} />

      <Modal show={calendar} onHide={() => setCalendar(false)}>
        <Calendar onHide={() => setCalendar(false)} />
      </Modal>

      <ComponentLoading isLoading={loading}>
        <Cards data={hotels.data} />
      </ComponentLoading>

      {!loading && Math.ceil(hotels.limit / limit) <= 1 ? null : (
        <Pagination
          limit={Math.ceil(hotels.limit / limit)}
          callback={startSearching}
        />
      )}
    </>
  );
}
