import { useLayoutEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { getHotels } from "../axios/appApi";
import useUpdateEffect from "../utils/hooks/use.update.effect";
import Cards from "../components/cards";
import SearchForm from "../components/search.form";

interface IHotel {
  _id: string;
  images: string[];
  name: string;
  description: string;
}

export default function MainPage({ search = false }: { search?: boolean }) {
  const [hotels, setHotels] = useState<{ data: IHotel[]; limit: number }>({
    data: [],
    limit: 0,
  });
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    order: { from: null, to: null },
    name: "",
    limit: 5,
  });

  function startSearching() {
    const { name, limit } = searchData;
    const offset = (activePage - 1) * limit;
    setLoading(true);
    getHotels(name, limit, offset)
      .then((data: any) => setHotels(data))
      .then(() => setLoading(false));
  }

  useLayoutEffect(() => {
    setHotels((prev: any) => ({ ...prev, data: [] }));
    !search && startSearching();
  }, [search]);

  useUpdateEffect(() => {
    startSearching();
  }, [activePage as never]);

  return (
    <>
      {search && (
        <SearchForm
          state={searchData}
          setState={setSearchData}
          search={startSearching}
        />
      )}
      {loading ? (
        <>
          <Spinner
            animation="border"
            variant="primary"
            className="m-auto mt-5"
          />
        </>
      ) : hotels.data.length > 0 ? (
        <Cards
          data={hotels.data}
          activePage={activePage}
          setActivePage={setActivePage}
          limit={Math.ceil(hotels.limit / searchData.limit)}
        />
      ) : null}
    </>
  );
}
