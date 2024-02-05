import { useEffect, useState } from "react";
import { getHotels } from "../axios/appApi";
import Cards from "../components/card";
import SearchForm from "../components/search.form";
import ComponentLoading from "../components/hoc/component.loading";
import Pagination from "../components/pagination";

interface IHotel {
  _id: string;
  images: string[];
  name: string;
  description: string;
}

export default function SearchPage({ all = false }: { all?: boolean }) {
  const [hotels, setHotels] = useState<{ data: IHotel[]; limit: number }>({
    data: [],
    limit: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchData, setSearchData] = useState({
    order: { from: null, to: null },
    name: "",
    limit: 5,
  });

  function startSearching(page: number = 1) {
    const { name, limit } = searchData;
    const offset = (page - 1) * limit;
    setLoading(true);
    getHotels(name, limit, offset)
      .then((data: any) => setHotels(data))
      .then(() => setLoading(false));
  }

  useEffect(() => {
    all && startSearching();
  }, [all]);

  return (
    <>
      <SearchForm
        state={searchData}
        setState={setSearchData}
        search={startSearching}
      />

      <ComponentLoading isLoading={loading}>
        {hotels.data.length > 0 && (
          <>
            <Cards data={hotels.data} />
            <Pagination
              limit={Math.ceil(hotels.limit / searchData.limit)}
              callback={startSearching}
            />
          </>
        )}
      </ComponentLoading>
    </>
  );
}
