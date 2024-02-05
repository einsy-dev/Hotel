import { useLayoutEffect, useState } from "react";
import Reservations from "../reservations";
import ComponentLoading from "../hoc/component.loading";
import { getAllReservations } from "../../axios/userApi";

export default function AllReservations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    setLoading(true);
    getAllReservations()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ComponentLoading isLoading={loading}>
      <Reservations data={data} />
    </ComponentLoading>
  );
}
